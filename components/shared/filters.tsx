import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "./title";

type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <>
      <div className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      </div>
    </>
  );
};
