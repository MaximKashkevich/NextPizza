'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
	CheckoutSidebar,
	Container,
	Title,
} from '../../../shared/components/shared'
import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	checkoutFormSchema,
} from '../../../shared/components/shared/checkout'
import { CheckoutFormValues } from '../../../shared/components/shared/checkout/checkout-form-schema'
import { useCart } from '../../../shared/hooks'
import { createOrder } from '../../actions'

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
		useCart()

	const form = useForm({
		resolver: zodResolver(checkoutFormSchema),
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

	const onSubmit = (data: CheckoutFormValues) => {
		console.log(data)
		createOrder(data)
	}

	return (
		<Container className='mt-10'>
			<Title
				text='Оформление заказа'
				className='font-extrabold mb-8 text-[36px]'
			/>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						{/* Левая часть */}
						<div className='flex flex-col flex-1 gap-10 mb-20'>
							<CheckoutCart
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								loading={loading}
								items={items}
							/>

							<CheckoutPersonalForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>

							<CheckoutAddressForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>
						</div>

						{/* Правая часть */}

						<div className='w-[450px]'>
							<CheckoutSidebar totalAmount={totalAmount} loading={loading} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
