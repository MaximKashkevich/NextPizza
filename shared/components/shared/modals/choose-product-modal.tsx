'use client'

import { useRouter } from 'next/navigation'
import { ChoosePizzaForm } from '..'
import { ProductWithRelations } from '../../../../@types/prisma'
import { cn } from '../../../lib/utils'
import { Dialog } from '../../ui'
import { DialogContent } from '../../ui/dialog'
import { ChooseProductForm } from '../chooseProductForm'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()

	// Проверяем, есть ли элементы в массиве и есть ли pizzaType у первого элемента
	const isPizzaForm =
		product.items.length > 0 && Boolean(product.items[0].pizzaType)

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
					/>
				) : (
					<ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
				)}
			</DialogContent>
		</Dialog>
	)
}
