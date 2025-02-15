import { Suspense } from 'react'
import {
	Container,
	Filters,
	ProductsGroupList,
	Title,
	TopBar,
} from '../../shared/components/shared'
import { findPizzas, GetSearchParams } from '../../shared/lib/find-pizzas'

export default async function Home({
	searchParams,
}: {
	searchParams: GetSearchParams
}) {
	const categories = await findPizzas(searchParams)
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
						<Suspense>
							<Filters />
						</Suspense>
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
