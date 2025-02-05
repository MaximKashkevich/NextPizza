import { create } from 'zustand'
import { Api } from '../services/api-client'
import { getCartDetails } from '../lib'

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

export interface CartState {
	loading: boolean
	error: boolean
	totalAmount: number
	items: CartStateItem[]

	/* Получение товаров из корзины */
	fetchCartItems: () => Promise<void>

	/* Запрос на обновление количества товара */
	updateItemQuantity: (id: number, quantity: number) => Promise<void>

	/* Запрос на добавление товара в корзину */
	//Типизация
	addCartItem: (values: any) => Promise<void>

	/* Запрос на удаление товара из корзины */
	removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

	fetchCartItems: async () => {
		try{
			set({loading: true, error: false})
			const data = await Api.cart.fetchCart()
			set(getCartDetails(data))
		} catch(e){
			console.log(e)
		}
	}
})