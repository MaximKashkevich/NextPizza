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

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart()

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
								items={items}
							/>

							<CheckoutPersonalForm />

							<CheckoutAddressForm />
						</div>

						{/* Правая часть */}

						<div className='w-[450px]'>
							<CheckoutSidebar totalAmount={totalAmount} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
