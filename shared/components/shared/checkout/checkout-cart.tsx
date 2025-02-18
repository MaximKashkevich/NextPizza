import { CheckoutItem, WhiteBlock } from '..'
import { PizzaSizes, PizzaTypes } from '../../../constants.ts/pizza'
import { getCartItemDetails } from '../../../lib'
import { CartStateItem } from '../../../lib/getCartDetails'

interface Props {
	items: CartStateItem[]
	onClickCountButton: (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => void
	removeCartItem: (id: number) => void
	loading?: boolean
	className?: string
}

export const CheckoutCart: React.FC<Props> = ({
	items,
	onClickCountButton,
	removeCartItem,
	loading,
	className,
}) => {
	return (
		<WhiteBlock title='1. Корзина'>
			<div className='flex flex-col gap-5'>
				{items.map(item => (
					<CheckoutItem
						key={item.id}
						id={item.id}
						imageUrl={item.imageUrl}
						details={getCartItemDetails(
							item.ingredients,
							item.pizzaType as PizzaTypes,
							item.pizzaSize as PizzaSizes
						)}
						name={item.name}
						disabled={item.disabled}
						price={item.price}
						quantity={item.quantity}
						onClickCountButton={type =>
							onClickCountButton(item.id, item.quantity, type)
						}
						onClickRemove={() => removeCartItem(item.id)}
					/>
				))}
			</div>
		</WhiteBlock>
	)
}
