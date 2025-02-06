import { mapPyzzaType, PizzaSizes, PizzaTypes } from '../constants.ts/pizza'
import { CartStateItem } from './getCartDetails'

export const getCartItemDetails = (
	ingredients: CartStateItem['ingredients'],
	pizzaType: PizzaTypes,
	pizzaSize: PizzaSizes
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
