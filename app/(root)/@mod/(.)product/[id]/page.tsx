import { notFound } from 'next/navigation'
import { prisma } from '../../../../../prisma/prisma-client'
import { ChooseProductModal } from '../../../../../shared/components/shared'

export default async function ProductModalPage({
	params,
}: {
	params: { id: string }
}) {
	const { id } = params

	if (!id) {
		return notFound()
	}

	// Запрос к базе данных
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id), // Преобразуем id в число
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
