'use client'

import { Ingredient, ProductItem } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'
import { GroupVariants, IngredientItem, PizzaImage } from '.'
import {
	mapPyzzaType,
	PizzaSizes,
	pizzaSizes,
	pizzaTypes,
	PizzaTypes,
} from '../../constants.ts/pizza'
import { cn } from '../../lib/utils'
import { Button } from '../ui'
import { Title } from './title'

interface Props {
	imageUrl: string
	name: string
	ingredients: Ingredient[]
	items: ProductItem[]
	// loading?: boolean
	// onSubmit: (itemId: number, ingredients: number[]) => void
	className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
	name,
	imageUrl,
	className,
	ingredients,
	items,
}) => {
	const [size, setSizes] = useState<PizzaSizes>(20)
	const [type, setTypes] = useState<PizzaTypes>(1)

	const [selectedIngredients, { toggle: addIngredients }] = useSet(
		new Set<number>()
	)

	const textDetaills = `${size} см ${mapPyzzaType[type]} пицца`

	const pizzaPrice =
		items.find(item => item.pizzaType == type && item.size == size)?.price || 0

	const pizzaIngredient = ingredients
		.filter(ingredient => selectedIngredients.has(ingredient.id))
		.reduce((acc, value) => acc + value.price, 0)

	const totalPrice = pizzaPrice + pizzaIngredient

	const handleClickAdd = () => {
		console.log({
			size,
			type,
			selectedIngredients,
		})
	}

	const filterdPizzasByType = items.filter(item => item.pizzaType == type)
	const availablePizzas = pizzaSizes.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !filterdPizzasByType.some(
			pizza => Number(pizza.size) === Number(item.value)
		),
	}))

	useEffect(() => {
		const isAvailableSize = availablePizzas.find(
			item => Number(item.value) == size && !item.disabled
		)
		const availableSize = availablePizzas.find(item => !item.disabled)

		if (!isAvailableSize && availableSize) {
			setSizes(Number(availableSize.value) as PizzaSizes)
		}
	}, [type])

	console.log({
		filterdPizzasByType,
		items,
		availablePizzas,
		pizzaPrice,
		totalPrice,
	})

	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className='w-[490px] bg-[#f7f6f5] p-7'>
				<Title text={name} size='md' className='mb-1 font-extrabold' />
				<p className='text-gray-400'>{textDetaills}</p>

				<div className='flex flex-col mt-4 gap-2'>
					<GroupVariants
						onClick={value => setSizes(Number(value) as PizzaSizes)}
						items={availablePizzas}
						value={String(size)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={value => setTypes(Number(value) as PizzaTypes)}
					/>
				</div>

				<div className='bg-gray-50 p-5 rounded-md my-2 h-[220px] overflow-auto scrollbar'>
					<div className='grid grid-cols-3 gap-3'>
						{ingredients.map(ingredient => (
							<IngredientItem
								imageUrl={ingredient.imageUrl}
								key={ingredient.id}
								name={ingredient.name}
								price={ingredient.price}
								onClick={() => addIngredients(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					onClick={handleClickAdd}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-4'
				>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	)
}
