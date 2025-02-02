import { Ingredient, ProductItem } from '@prisma/client'
import { calcTotalPizzaPrice } from '.'
import { mapPyzzaType, PizzaSizes, PizzaTypes } from '../constants.ts/pizza'
/**
 *
 * @param size - тип размера
 * @param type - тип теста
 * @param mapPyzzaType -
 * @param items - список вариаций
 * @param ingredients - список игредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns
 */
export const PizzaDetails = (
	size: PizzaSizes,
	type: PizzaTypes, // Используйте фактический тип mapPyzzaType
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const textDetails = `${size} см ${mapPyzzaType[type]} пицца`

	const totalPrice = calcTotalPizzaPrice(
		type,
		size,
		items,
		ingredients,
		selectedIngredients
	)

	return { totalPrice, textDetails }
}
