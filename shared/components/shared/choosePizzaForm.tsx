'use client'

import { Ingredient } from '@prisma/client'
import { useState } from 'react'
import { GroupVariants, PizzaImage } from '.'
import { PizzaSizes, pizzaSizes, PizzaTypes } from '../../constants.ts/pizza'
import { cn } from '../../lib/utils'
import { Button } from '../ui'
import { Title } from './title'

interface Props {
	imageUrl: string
	name: string
	ingredients: Ingredient[]
	// items: ProductItem[]
	// loading?: boolean
	// onSubmit: (itemId: number, ingredients: number[]) => void
	className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
	name,
	imageUrl,
	className,
	ingredients,
}) => {
	const [size, setSizes] = useState<PizzaSizes>(20)
	const [type, setTypes] = useState<PizzaTypes>(1)

	const textDetaills = '30 см, традиционной пиццы'
	const totalPrice = '350'

	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className='w-[490px] bg-[#f7f6f5] p-7'>
				<Title text={name} size='md' className='mb-1 font-extrabold' />
				<p className='text-gray-400'>{textDetaills}</p>

				<GroupVariants
					items={pizzaSizes}
					value={String(size)}
					onClick={value => setSizes(Number(value) as PizzaSizes)}
				/>

				<Button className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	)
}
