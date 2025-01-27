import { notFound } from 'next/navigation'
import { ChooseProductModal } from '../../../../../components/shared'
import { prisma } from '../../../../../prisma/prisma-client'

export default async function ProductModalPage({
	params,
}: {
	params: { id: string | undefined }
}) {
	// Проверяем, есть ли id
	if (!params.id) {
		return notFound()
	}

	const product = await prisma.product.findFirst({
		where: {
			id: Number(params.id),
		},
		include: {
			ingredients: true,
			items: true,
		},
	})

	if (!product) {
		return notFound()
	}

	return <ChooseProductModal product={product} />
}
