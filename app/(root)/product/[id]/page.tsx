import { notFound } from 'next/navigation'
import { prisma } from '../../../../prisma/prisma-client'
import { Container, ProductForm } from '../../../../shared/components/shared'

interface PageProps {
	params: {
		id: string
	}
}

export default async function ProductPage({ params: { id } }: PageProps) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							items: true,
						},
					},
				},
			},
			items: true,
		},
	})

	if (!product) {
		notFound()
	}

	return (
		<Container className='flex flex-col my-10 '>
			<ProductForm product={product} />
		</Container>
	)
}
