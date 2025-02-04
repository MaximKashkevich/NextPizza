import { Ingredient } from '@prisma/client'
import { mapPyzzaType, PizzaSizes, PizzaTypes } from '../constants.ts/pizza'

export const getCartItemDetails = (
	ingredients: Ingredient[],
	pizzaType?: PizzaTypes,
	pizzaSize?: PizzaSizes
): string => {
	const details = []

	if (pizzaSize && pizzaType) {
		const typeName = mapPyzzaType[pizzaType]
		details.push(`${typeName} ${pizzaSize} см`)
	}

	if (ingredients) {
		details.push(...ingredients.map(ingredient => ingredient.name))
	}

	return details.join(', ')
}
