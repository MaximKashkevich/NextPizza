import { CartItemDTO } from '../services/dto/cart.dto'

export const CalcCartItemPrice = (item: CartItemDTO): number => {
	const ingredientsPrice = item.ingredients.reduce(
		(acc, value) => acc + value.price,
		0
	)
	return ingredientsPrice + item.productItem.price + item.quantity
}
