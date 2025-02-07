import { create } from 'zustand'
import { getCartDetails } from '../lib'
import { CartStateItem } from '../lib/getCartDetails'
import { Api } from '../services/api-client'

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

export const useCartStore = create<CartState>(set => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.fetchCart()
			set(getCartDetails(data))
		} catch (e) {
			console.log(e)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	updateItemQuantity: async (id: number) => {},

	addCartItem: async (values: any) => {},

	removeCartItem: async (id: number) => {},
}))
