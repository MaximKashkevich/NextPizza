'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { PizzaSizes, PizzaTypes } from '../../constants.ts/pizza'
import { getCartItemDetails } from '../../lib'
import { useCartStore } from '../../store/cart'
import { Button } from '../ui'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../ui/sheet'
import { CartDrawerItem } from './cartDrawerItem'

interface Props {
	className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
	children,
}) => {
	const fetchCartItems = useCartStore(state => state.fetchCartItems)
	const items = useCartStore(state => state.items)
	const totalAmount = useCartStore(state => state.totalAmount)

	useEffect(() => {
		fetchCartItems(items)
	}, [])

	console.log(items)

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
				<SheetHeader>
					<SheetTitle>
						В корзине
						<span className='font-bold'> {items.length} товара(ов)</span>
					</SheetTitle>
				</SheetHeader>
				<div className='-mx-6 mt-5 overflow-auto flex-1 scrollbar'>
					<div className='mb-2'>
						{Array.isArray(items) && items.length > 0 ? (
							items.map(item => (
								<CartDrawerItem
									id={item.id}
									imageUrl={item.imageUrl}
									details={
										item.pizzaSize && item.pizzaType
											? getCartItemDetails(
													item.ingredients,
													item.pizzaType as PizzaTypes,
													item.pizzaSize as PizzaSizes
											  )
											: ''
									}
									name={item.name}
									price={item.price}
									quantity={item.quantity}
									key={item.id}
								/>
							))
						) : (
							<p>Корзина пуста</p>
						)}
					</div>
				</div>

				<SheetFooter className='-mx-6 bg-white p-8'>
					<div className='w-full'>
						<div className='flex mb-4'>
							<span className='flex flex-1 text-lg text-neutral-500'>
								Итого
								<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
							</span>

							<span className='font-bold text-lg'>{totalAmount} ₽</span>
						</div>

						<Link href='/cart'>
							<Button type='submit' className='w-full h-12 text-base'>
								Оформить заказ
								<ArrowRight className='w-5 ml-2' />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
