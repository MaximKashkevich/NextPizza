import React from "react";
import Link from "next/link";
import { Title } from "./index";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import Image from "next/image";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  // ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  //   ingredients,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img width={215} height={215} src={imageUrl} alt="Logo" />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">
          Цыпленок, моцарелла, сыры чедер и пормезан, сырный соус, томаты
        </p>
      </Link>
      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          от <b>{price} ₽</b>
        </span>

        <Button variant="secondary" className="text-base font-bold">
          <Plus size={20} className="mr-1" />
          Добавить
        </Button>
      </div>
    </div>
  );
};
