'use client'

import { ArrowRight, ShoppingCart } from 'lucide-react'
import { CartDrawer } from '.'
import { useCartStore } from '../../store/cart'
import { Button } from '../ui'

interface Props {
	className?: string
}

export const CartButton: React.FC<Props> = () => {
	const totalAmount = useCartStore(state => state.totalAmount)
	const loading = useCartStore(state => state.loading)
	const items = useCartStore(state => state.items)

	return (
		<CartDrawer>
			<Button disabled={loading} className='group relative'>
				<b>{totalAmount}₽</b>
				<span className='h-full w-[1px] bg-white/30 mx-2 hidden md:block' />
				<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
					<ShoppingCart size={16} className='relative' strokeWidth={2} />
					<b>{items.length}</b>
				</div>
				<ArrowRight
					size={20}
					className='absolute right-5 transition duration-300 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
				/>
			</Button>
		</CartDrawer>
	)
}
