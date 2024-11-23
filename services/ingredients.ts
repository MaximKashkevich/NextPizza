import { Ingredient } from "@prisma/client";
import { instance } from "./axios";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await instance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

  return data;
};
