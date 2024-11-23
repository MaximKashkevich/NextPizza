"use client";

import { Search, X } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { useClickAway } from "react-use";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Api } from "../../services/api-client";
import { Product } from "@prisma/client";

type Props = {
  className?: string;
};

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (focused) {
      setOpacity(1);
    } else {
      const timeout = setTimeout(() => setOpacity(0), 300); // время должно совпадать с duration
      return () => clearTimeout(timeout);
    }
  }, [focused]);

  // Используйте useEffect для поиска продуктов
  useEffect(() => {
    if (searchQuery) {
      const delayDebounceFn = setTimeout(() => {
        Api.products.search(searchQuery).then((items) => {
          setProducts(items);
          console.log(searchQuery);
        });
      }, 250);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setProducts([]); // Очищаем продукты при пустом запросе
    }
  }, [searchQuery]);

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div
          className={
            "fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30 transition-opacity duration-300"
          }
          style={{ opacity }}
        />
      )}
      <div
        ref={ref}
        className="flex rounded-2xl flex-1 justify-between relative h-11 z-30"
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <X
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-2.5 text-gray-400 cursor-pointer"
          />
        )}
      </div>

      {/* Всплывающее меню в поиске*/}
      {products.length > 0 && (
        <div
          className={cn(
            "absolute flex flex-col w-full max-w-[57.3%] mr-10 bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-[90px]" // Отступ от поля поиска
          )}
        >
          {products.map((product) => (
            <Link
              onClick={onClickItem}
              key={product.id}
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
              href={`/product/${product.id}`}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                width={32}
                height={32}
              />
              <div>{product.name}</div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
