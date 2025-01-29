import { notFound } from 'next/navigation'
import { prisma } from '../../../../prisma/prisma-client'
import {
	Container,
	GroupVariants,
	PizzaImage,
	Title,
} from '../../../../shared/components/shared'

export default async function ProductPage({
	params: { id },
}: {
	params: { id: string }
}) {
	const product = await prisma.product.findFirst({ where: { id: Number(id) } })

	if (!product) {
		notFound()
	}
	return (
		<Container className='flex flex-col my-10 '>
			<div className='flex flex-1'>
				<PizzaImage imageUrl={product.imageUrl} size={40} className='' />

				<div className='w-[490px] bg-orange-100 p-7 rounded-sm'>
					<Title
						text={product.name}
						size='md'
						className='flex font-extrabold mb-1'
					/>

					<p className='text-gray-400'>qqqqqqqqqqq</p>

					<GroupVariants
						items={[
							{
								name: 'Маленькая',
								value: '1',
							},
							{
								name: 'Средняя',
								value: '2',
							},
							{
								name: 'Большая',
								value: '3',
							},
						]}
					/>
				</div>
			</div>
		</Container>
	)
}
