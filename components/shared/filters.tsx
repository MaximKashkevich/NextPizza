"use client";

import React from "react";
import { Title, RangeSlider, CheckboxFiltersGroup } from "./index";
import { Input } from "../ui";

import { useIngredients, useFilters, useQueryFilters } from "../../hooks/index";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  // Используем хук для синхронизации фильтров с URL
  useQueryFilters(filters);

  const updatePrice = (prices: number[]) => {
    if (prices.length === 2) {
      filters.setPrice("priceFrom", prices[0]);
      filters.setPrice("priceTo", prices[1]);
    }
  };

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className={className}>
      {/* Заголовок */}
      <Title text="Фильтрация" size="sm" className="mb-5 font-extrabold" />

      {/* Тип теста */}
      {/* <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes} // Исправлено на правильный метод
        selected={filters.pizzaTypes} // Исправлено на правильное состояние
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      /> */}

      {/* Размеры */}
      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      {/* Минимальная и максимальная стоимость */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom || "")} // Исправлено на корректное значение
            onChange={(e) =>
              filters.setPrice("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.prices.priceTo || "")} // Исправлено на корректное значение
            onChange={(e) =>
              filters.setPrice("priceTo", Number(e.target.value))
            }
          />
        </div>
        {/* Слайдер */}
        <RangeSlider
          min={0}
          max={5000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 5000,
          ]}
          onValueChange={updatePrice}
        />
      </div>

      {/* Ингредиенты */}
      <CheckboxFiltersGroup
        title="Ингредиенты"
        limit={6}
        className="mt-5"
        defaultItems={items.slice(0, 6)} // Исправлено на ingredients
        items={items} // Исправлено на ingredients
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients} // Убедитесь, что функция корректно работает
        selected={filters.selectedIngredients} // Преобразуем Set в массив
      />
    </div>
  );
};
