import { Ingredient, ProductItem } from '@prisma/client'
import { PizzaSizes, PizzaTypes } from '../constants.ts/pizza'

/** Функция для посчета общей стоимости пиццы
 *
 * @param type - тип теста выбранной пиццы
 * @param size - тип размера выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns number общую стоимость
 */
export const calcTotalPizzaPrice = (
	type: PizzaTypes,
	size: PizzaSizes,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const pizzaPrice =
		items.find(item => item.pizzaType == type && item.size == size)?.price || 0

	const pizzaIngredient = ingredients
		.filter(ingredient => selectedIngredients.has(ingredient.id))
		.reduce((acc, value) => acc + value.price, 0)

	return pizzaPrice + pizzaIngredient
}
