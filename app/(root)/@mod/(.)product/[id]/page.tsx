import { notFound } from 'next/navigation'
import { prisma } from '../../../../../prisma/prisma-client'
import { ChooseProductModal } from '../../../../../shared/components/shared'

export default async function ProductModalPage({
	params: id,
}: {
	params: { id: string }
}) {
	if (!id) {
		return notFound()
	}

	// Запрос к базе данных
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			items: true,
		},
	})

	// Проверяем на наличие продукта в базе данных
	if (!product) {
		return notFound()
	}

	// Возвращаем компонент с продуктом
	return <ChooseProductModal product={product} />
}
