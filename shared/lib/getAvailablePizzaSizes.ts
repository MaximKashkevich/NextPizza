import { ProductItem } from '@prisma/client'
import { Variant } from '../components/shared/groupVariants'
import { pizzaSizes, PizzaTypes } from '../constants.ts/pizza'

export const getAvailablePizzaSizes = (
	type: PizzaTypes,
	items: ProductItem[]
): Variant[] => {
	const filteredPizzasByType = items.filter(item => item.pizzaType == type)

	return pizzaSizes.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some(
			pizza => Number(pizza.size) === Number(item.value)
		),
	}))
}
