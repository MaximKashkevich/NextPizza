import {
  Container,
  TopBar,
  Title,
  Filters,
  ProductsGroupList,
} from "../components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabolt"></Title>
      </Container>
      <TopBar />
      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Список Товаров */}
          <div className="flex-1">
            <ProductsGroupList
              title="Пиццы"
              items={[
                {
                  id: 1,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
                {
                  id: 2,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
                {
                  id: 3,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
                {
                  id: 4,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
                {
                  id: 5,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
                {
                  id: 6,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
              ]}
              categoryId={1}
            />
            <ProductsGroupList
              title="Завтрак"
              items={[
                {
                  id: 1,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
                {
                  id: 2,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
                {
                  id: 3,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
                {
                  id: 4,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
                {
                  id: 5,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
                {
                  id: 6,
                  name: "Пицца 1",
                  price: 150,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                },
              ]}
              categoryId={2}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
