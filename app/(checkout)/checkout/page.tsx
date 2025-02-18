'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
	CheckoutSidebar,
	Container,
	Title,
	WhiteBlock,
} from '../../../shared/components/shared'
import { CheckoutCart } from '../../../shared/components/shared/checkout'
import { FormInput } from '../../../shared/components/shared/form-components/form-input'
import { Input, Textarea } from '../../../shared/components/ui'
import { useCart } from '../../../shared/hooks'

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart()

	const form = useForm({
		resolver: zodResolver(),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	})

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1

		updateItemQuantity(id, newQuantity)
	}

	return (
		<Container className='mt-10'>
			<Title
				text='Оформление заказа'
				className='font-extrabold mb-8 text-[36px]'
			/>
			<div className='flex gap-10'>
				{/* Левая часть */}
				<div className='flex flex-col flex-1 gap-10 mb-20'>
					<CheckoutCart
						onClickCountButton={onClickCountButton}
						removeCartItem={removeCartItem}
						items={items}
					/>
					<WhiteBlock title='2. Персональные данные'>
						<div className='grid grid-cols-2 gap-5'>
							<FormInput
								name='firstName'
								className='text-base'
								placeholder='Имя'
							/>
							<FormInput
								name='lastName'
								className='text-base'
								placeholder='Фамилия'
							/>
							<FormInput
								name='email'
								className='text-base'
								placeholder='E-Mail'
							/>
							<FormInput
								name='phone'
								className='text-base'
								placeholder='Телефон'
							/>
						</div>
					</WhiteBlock>

					<WhiteBlock title='3. Адрес доставки'>
						<div className='flex flex-col gap-5'>
							<Input name='firstName' className='text-base' placeholder='Имя' />
							<Textarea
								className='text-base'
								rows={5}
								placeholder='Комментарий к заказу'
							/>
						</div>
					</WhiteBlock>
				</div>

				{/* Правая часть */}

				<div className='w-[450px]'>
					<CheckoutSidebar totalAmount={totalAmount} />
				</div>
			</div>
		</Container>
	)
}
