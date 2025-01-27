import {
	Container,
	Filters,
	ProductsGroupList,
	Title,
	TopBar,
} from '../../components/shared'
import { prisma } from '../../prisma/prisma-client'

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					items: true,
					ingredients: true,
				},
			},
		},
	})

	return (
		<>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabolt'></Title>
			</Container>
			<TopBar
				categories={categories.filter(
					categorie => categorie.products.length > 0 //Если в опредленной категории есть продукт, рендерим
				)}
			/>

			<Container className='pb-14 mt-10'>
				<div className='flex gap-[60px]'>
					{/* Фильтрация */}
					<div className='w-[250px]'>
						<Filters />
					</div>
					{/* Список товаров */}
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categories.map(
								category =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											categoryId={category.id}
											items={category.products}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
