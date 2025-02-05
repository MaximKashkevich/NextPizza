import { CartDTO } from '../services/dto/cart.dto'

export type CartStateItem = {
	id: number
	quantity: number
	name: string
	imageUrl: string
	price: number
	disabled?: boolean
	pizzaSize?: number | null
	pizzaType?: number | null
	ingredients: Array<{ name: string; price: number }>
}

interface ReturnProps {
	items: CartStateItem[]
	totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.items.map(item => {
		id: item.id
		quantity: item.quantity
		name: item.productItem.product.name
		price: item.productItem.product.price
		pizzaSize: item.productItem.size
		type: item.productItem.pizzaType
		ingredients: item.ingredients.map(ingredient => {
			name: ingredient.name
			price: ingredient.price
		})
	})

	return {
		items,
		totalAmount: data.totalAmount,
	}
}
