import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useSet } from 'react-use'

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

interface QueryFilters extends PriceProps {
	sizes: string
	ingredients: string
}

export interface Filters {
	sizes: Set<string>
	selectedIngredients: Set<string>
	prices: PriceProps
}

interface ReturnProps extends Filters {
	setPrice: (name: keyof PriceProps, value: number) => void
	setSizes: (value: string) => void
	setSelectedIngredients: (value: string) => void
}
export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>

	// Фильтр ингредиентов
	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(',') || [])
	)

	// Фильтр размеров
	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(searchParams.get('sizes')?.split(',') || [])
	)

	// Фильтр цены
	const [prices, setPrice] = useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	})

	// Обновление цены из скролла (фильтр цены)
	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrice(prevPrices => {
			const newPrices = { ...prevPrices }

			newPrices[name] = value

			return newPrices
		})
	}

	// Установка размеров
	const setSizes = (value: string) => {
		toggleSizes(value)
	}

	// Установка выбранных ингредиентов
	const setSelectedIngredients = (value: string) => {
		toggleIngredients(value)
	}

	return {
		sizes,
		selectedIngredients,
		prices,
		setPrice: updatePrice,
		setSizes,
		setSelectedIngredients,
	}
}
