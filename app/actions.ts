'use server'

import { prisma } from '../prisma/prisma-client'
import { CheckoutFormValues } from '../shared/components/shared/checkout/checkout-form-schema'

export const createOrder = async (data: CheckoutFormValues) => {
	console.log(data)

	const token = '123'

	await prisma.order.create({
		data: {
			fullName: data.firstName + ' ' + data.lastName,
			token,
			email: data.email,
			phone: data.phone,
			address: data.address,
			comment: data.comment ?? '',
			items: [],
			status: 'PENDING',
			totalAmount: 0,
		},
	})
}
