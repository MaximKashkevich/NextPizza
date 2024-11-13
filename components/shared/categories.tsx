import React from "react";
import { cn } from "../../lib/utils";

interface Props {
  className?: string;
}

const cats = [
  "Пиццы",
  "Комбо",
  "Закуски",
  "Коктейли",
  "Кофе",
  "Напитки",
  "Десерты",
];
const activeIndex = 0;

export const Categories: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl opacity-60",
        className
      )}
    >
      {cats.map((category, index) => (
        <a
          key={index}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeIndex === index
              ? "bg-white bg-opacity-70 shadow-md text-primary" // Изменено на bg-opacity-70 и text-black
              : "text-black opacity-100 font-extrabold"
          )}
        >
          <button>{category}</button>
        </a>
      ))}
    </div>
  );
};
