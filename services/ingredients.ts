import { instance } from "./axios";
import { ApiRoutes } from "./constants";
import { Ingredient } from "@prisma/client";

export const getAll = async (): Promise<Ingredient[]> => {
  return (await instance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};
