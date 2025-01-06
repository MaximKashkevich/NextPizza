"use client";

import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filterCheckbox";
import { Input, Skeleton } from "../ui";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  selected?: Set<string>;
  className?: string;
  loading?: boolean;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
  selected = new Set(),
  loading,
  onClickCheckbox,
  name,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Фильтрация элементов на основе значения поиска
  const filteredItems = items.filter((item) =>
    item.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Ограничение отображаемых элементов
  const list = showAll ? filteredItems : filteredItems.slice(0, limit);

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mt-3">{title}</p>
        {/* Отображение скелетонов при загрузке */}
        {Array.from({ length: limit }).map((_, index) => (
          <Skeleton key={index} className="mb-4 h-6 rounded-[8px]" />
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {!showAll && (
        <div className="mb-5">
          <Input
            onChange={(e) => onChangeSearchInput(e.target.value)}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>
      {list.length > 0 && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? "Скрыть все" : "Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
