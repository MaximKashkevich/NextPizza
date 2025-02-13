import { ProductItem } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'
import { Variant } from '../components/shared/groupVariants'
import { PizzaSizes, PizzaTypes } from '../constants.ts/pizza'
import { getAvailablePizzaSizes } from '../lib'

interface ReturnProps {
	size: PizzaSizes
	type: PizzaTypes
	setSizes: (size: PizzaSizes) => void
	setTypes: (type: PizzaTypes) => void
	selectedIngredients: Set<number>
	currentItemId?: number
	addIngredients: (id: number) => void
	availableSizes: Variant[]
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
	const [selectedIngredients, { toggle: addIngredients }] = useSet(
		new Set<number>()
	)
	const [size, setSizes] = useState<PizzaSizes>(20)
	const [type, setTypes] = useState<PizzaTypes>(1)

	const currentItemId = items.find(
		item => item.pizzaType === type && item.size === size
	)?.id

	const availableSizes = getAvailablePizzaSizes(type, items)
	useEffect(() => {
		const isAvailableSize = availableSizes.find(
			item => Number(item.value) == size && !item.disabled
		)
		const availableSize = availableSizes.find(item => !item.disabled)

		if (!isAvailableSize && availableSize) {
			setSizes(Number(availableSize.value) as PizzaSizes)
		}
	}, [type])

	return {
		size,
		setSizes,
		type,
		setTypes,
		selectedIngredients,
		addIngredients,
		availableSizes,
		currentItemId,
	}
}
