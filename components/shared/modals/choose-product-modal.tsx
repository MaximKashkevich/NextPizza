'use client'

import { Product } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { cn } from '../../../lib/utils'
import { Dialog } from '../../ui'
import { DialogContent } from '../../ui/dialog'
import { ChoosePizzaForm } from '../choosePizzaForm'

interface Props {
	product: Product
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}
			>
				<ChoosePizzaForm
					imageUrl={product.imageUrl}
					name={product.name}
					ingredients={[]}
				/>
			</DialogContent>
		</Dialog>
	)
}
