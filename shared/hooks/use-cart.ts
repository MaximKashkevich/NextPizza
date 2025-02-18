import { useEffect } from 'react'
import { CartStateItem } from '../lib/getCartDetails'
import { CreateCartItemValues } from '../services/dto/cart.dto'
import { useCartStore } from '../store/cart'

type ReturnProps = {
	totalAmount: number
	items: CartStateItem[]
	loading: boolean
	updateItemQuantity: (id: number, quantity: number) => void
	removeCartItem: (id: number) => void
	addCartItem: (values: CreateCartItemValues) => void
}

export const useCart = (): ReturnProps => {
	const fetchCartItems = useCartStore(state => state.fetchCartItems)
	const items = useCartStore(state => state.items)
	const totalAmount = useCartStore(state => state.totalAmount)
	const updateItemQuantity = useCartStore(state => state.updateItemQuantity)
	const removeCartItem = useCartStore(state => state.removeCartItem)
	const loading = useCartStore(state => state.loading)
	const addCartItem = useCartStore(state => state.addCartItem)

	useEffect(() => {
		fetchCartItems()
	}, [])

	return {
		items,
		loading,
		totalAmount,
		updateItemQuantity,
		removeCartItem,
		addCartItem,
	}
}
