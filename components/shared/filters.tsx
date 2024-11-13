"use client";

import React from "react";
import {
  Title,
  FilterCheckbox,
  RangeSlider,
  CheckboxFiltersGroup,
} from "./index";
import { Input } from "../ui";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <>
      <div className={className}>
        {/* Заголовок */}
        <Title text="Фильтрация" size="sm" className="mb-5 font-extrabold" />
        {/* Верхние чекбоксы */}
        <div className="flex flex-col gap-4">
          <FilterCheckbox text="Можно собирать" value="1" />
          <FilterCheckbox text="Новинки" value="2" />
        </div>
        {/* Минимальная и максимальная стоимость */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mb-3">Цена от и до:</p>
          <div className="flex gap-3 mb-5">
            <Input type="number" placeholder="0" min={0} max={1000} />
            <Input type="number" min={100} max={1000} placeholder="1000" />
          </div>
          {/* Слайдер */}
          <RangeSlider min={0} max={5000} step={10} />
        </div>
        <CheckboxFiltersGroup
          title="Ингридиенты"
          limit={6}
          className="mt-5"
          defaultItems={[
            {
              text: "Сырный соус",
              value: "1",
            },
            {
              text: "Моцарелла",
              value: "2",
            },
            {
              text: "Чеснок",
              value: "3",
            },
            {
              text: "Солённые огурчики",
              value: "4",
            },
            {
              text: "Красный лук",
              value: "5",
            },
            {
              text: "Томаты",
              value: "6",
            },
          ]}
          items={[
            {
              text: "Сырный соус",
              value: "1",
            },
            {
              text: "Моцарелла",
              value: "2",
            },
            {
              text: "Чеснок",
              value: "3",
            },
            {
              text: "Солённые огурчики",
              value: "4",
            },
            {
              text: "Красный лук",
              value: "5",
            },
            {
              text: "Томаты",
              value: "6",
            },
            {
              text: "ПЭПЭРОННИ",
              value: "7",
            },
          ]}
        />
      </div>
    </>
  );
};
