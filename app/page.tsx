import {
  Container,
  TopBar,
  Title,
  Filters,
  ProductsGroupList,
} from "../components/shared";
import { prisma } from "../prisma/prisma-client";

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
  });

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabolt"></Title>
      </Container>
      {/* <TopBar
        categories={categories.filter(
          (categorie) => categorie.products.length > 0 //Если в опредленной категории есть продукт, рендерим
        )}
      /> */}

      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Список Товаров */}
          <div className="flex-1">
            {categories.map(
              (item) =>
                // Делаем проверку, есть ли у определенной категории продукт
                item.products.length > 0 && (
                  <ProductsGroupList
                    key={item.id}
                    title={item.name}
                    categoryId={item.id}
                    items={item.products}
                  />
                )
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
