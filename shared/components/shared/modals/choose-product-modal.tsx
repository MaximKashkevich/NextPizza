'use client'

import { useRouter } from 'next/navigation'
import { ProductForm } from '..'
import { ProductWithRelations } from '../../../../@types/prisma'
import { cn } from '../../../lib/utils'
import { Dialog } from '../../ui'
import { DialogContent } from '../../ui/dialog'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white',
					className
				)}
			>
				<ProductForm product={product} />
			</DialogContent>
		</Dialog>
	)
}
