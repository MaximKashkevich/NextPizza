import { notFound } from 'next/navigation'
import { ChooseProductModal } from '../../../../../components/shared'
import { prisma } from '../../../../../prisma/prisma-client'

interface PageProps {
	params: {
		id: string
	}
}

export default async function ProductModalPage({ params }: PageProps) {
	const { id } = params // Деструктурируем id из params

	// Проверяем, если id не определен (хотя это не должно происходить в Next.js)
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
