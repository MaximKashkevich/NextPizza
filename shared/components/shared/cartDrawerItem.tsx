import { Trash2Icon } from 'lucide-react'
import { CountButton } from '.'
import { cn } from '../../lib/utils'

interface Props extends CartItemProps {
	className?: string
}

import * as CartItem from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'

export const CartDrawerItem: React.FC<Props> = ({
	imageUrl,
	name,
	price,
	quantity,
	details,
	disabled,
	// onClickCountButton,
	// onClickRemove,
	className,
}) => {
	return (
		<div className={cn('flex bg-white p-5 gap-6', className)}>
			<CartItem.Image src={imageUrl} />

			<div className='flex-1'>
				<CartItem.Info name={name} details={details} />

				<hr className='my-3' />

				<div className='flex items-center justify-between'>
					<CountButton onClick={type => console.log(type)} value={quantity} />

					<div className='flex items-center gap-3'>
						<CartItem.Price value={price} />
						<Trash2Icon
							className='text-gray-400 cursor-pointer hover:text-gray-600'
							size={16}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
