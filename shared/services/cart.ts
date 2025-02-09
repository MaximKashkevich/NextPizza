import { instance } from './axios'
import { CartDTO } from './dto/cart.dto'

export const fetchCart = async (): Promise<CartDTO> => {
	return (await instance.get<CartDTO>('/cart')).data
}

export const updateItemQuantity = async (
	itemId: number,
	quantity: number
): Promise<CartDTO> => {
	return (await instance.patch<CartDTO>('/cart/' + itemId, { quantity })).data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
	return (await instance.delete<CartDTO>('/cart/' + id)).data
}
