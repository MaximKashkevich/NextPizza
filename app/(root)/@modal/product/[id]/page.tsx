import { notFound } from 'next/navigation'
import { prisma } from '../../../../../prisma/prisma-client'

export default async function ProductPage({
	params: { id },
}: {
	params: { id: string }
}) {
	const product = await prisma.product.findFirst({ where: { id: Number(id) } })

	if (!product) {
		notFound()
	}
	return <h1>21212</h1>
}
