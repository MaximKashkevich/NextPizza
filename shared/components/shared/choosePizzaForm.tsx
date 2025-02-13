'use client'

import { Ingredient, ProductItem } from '@prisma/client'
import { GroupVariants, IngredientItem, PizzaImage } from '.'
import { PizzaSizes, pizzaTypes, PizzaTypes } from '../../constants.ts/pizza'

import { usePizzaOptions } from '../../hooks'
import { PizzaDetails } from '../../lib'
import { cn } from '../../lib/utils'
import { Button } from '../ui'
import { Title } from './title'

interface Props {
	imageUrl: string
	name: string
	ingredients: Ingredient[]
	items: ProductItem[]
	// loading?: boolean
	onSubmit: (itemId: number, ingredients: number[]) => void
	className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
	name,
	imageUrl,
	className,
	ingredients,
	items,
	onSubmit,
}) => {
	const {
		size,
		type,
		setSizes,
		setTypes,
		selectedIngredients,
		addIngredients,
		availableSizes,
		currentItemId,
	} = usePizzaOptions(items)

	const { totalPrice, textDetails } = PizzaDetails(
		size,
		type,
		items,
		ingredients,
		selectedIngredients
	)

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients))
		}
	}

	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className='w-[490px] bg-[#f7f6f5] p-7'>
				<Title text={name} size='md' className='mb-1 font-extrabold' />
				<p className='text-gray-400'>{textDetails}</p>

				<div className='flex flex-col mt-4 gap-2'>
					<GroupVariants
						onClick={value => setSizes(Number(value) as PizzaSizes)}
						items={availableSizes}
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
