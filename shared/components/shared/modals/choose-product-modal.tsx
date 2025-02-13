'use client'

import { useRouter } from 'next/navigation'
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
	const addCartItem = useCartStore(state => state.addCartItem)

	// Проверяем, есть ли элементы в массиве и есть ли pizzaType у первого элемента
	const isPizzaForm =
		product.items.length > 0 && Boolean(product.items[0].pizzaType)

	const onAddProduct = () => {
		addCartItem({
			productItemId: firstItem.id,
		})
	}

	const onAddPizza = (productItemId: number, ingredients: number[]) => {
		addCartItem({
			productItemId: firstItem.id,
			ingredients,
		})
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
						onSubmit={onAddPizza}
					/>
				) : (
					<ChooseProductForm
						onSubmit={onAddProduct}
						imageUrl={product.imageUrl}
						name={product.name}
						price={firstItem.price}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
