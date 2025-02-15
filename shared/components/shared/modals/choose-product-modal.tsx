'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ChoosePizzaForm } from '..'
import { ProductWithRelations } from '../../../../@types/prisma'
import { cn } from '../../../lib/utils'
import { useCartStore } from '../../../store/cart'
import { Dialog } from '../../ui'
import { DialogContent } from '../../ui/dialog'
import { ChooseProductForm } from '../chooseProductForm'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()
	const firstItem = product.items[0]
	console.log(firstItem)
	const addCartItem = useCartStore(state => state.addCartItem)
	const items = useCartStore(state => state.items)
	const loading = useCartStore(state => state.loading)

	// Проверяем, есть ли элементы в массиве и есть ли pizzaType у первого элемента
	const isPizzaForm =
		product.items.length > 0 && Boolean(product.items[0].pizzaType)

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
				ingredients,
			})
			toast.success(product.name + ` добавлена в корзину`)
			router.back()
		} catch (error) {
			toast.error(`Не удалось добавить товар в корзину`)
			console.error(error)
		}
	}

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white',
					className
				)}
			>
				{isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						items={product.items}
						onSubmit={onSubmit}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						onSubmit={onSubmit}
						imageUrl={product.imageUrl}
						name={product.name}
						price={firstItem.price}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
