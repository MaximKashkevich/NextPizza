import { instance } from './axios'
import { CartDTO } from './dto/cart.dto'

export const getCart = async (): Promise<CartDTO> => {
	return (await instance.get<CartDTO>('/api/cart')).data
}
