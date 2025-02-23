'use server'

import { OrderStatus, Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { cookies } from 'next/headers'
import { prisma } from '../prisma/prisma-client'
import { PayOrderTemplate } from '../shared/components'
import { CheckoutFormValues } from '../shared/components/shared/checkout/checkout-form-schema'
import { createPayment, sendEmail } from '../shared/lib'
import { getUserSession } from '../shared/lib/get-user-session'

export const createOrder = async (data: CheckoutFormValues) => {
	try {
		const cookieStore = await cookies()
		const cartToken = cookieStore.get('cartToken')?.value

		if (!cartToken) {
			throw new Error('Cart token not found')
		}

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		})

		/* Если корзина не найдена, возвращаем ошибку */
		if (!userCart) {
			throw new Error('Cart not found')
		}

		/* Если корзина пустая, возвращаем ошибку */
		if (userCart?.totalAmount === 0) {
			throw new Error('Cart is empty')
		}

		/* Создаем заказ */
		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: `${data.firstName} ${data.lastName}`,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment ?? '',
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: userCart.items,
			},
		})

		// Очищаем корзину
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		})

		// Оищаем список товаров
		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		})

		// Создаем платеж на yookassa
		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: 'Оплата заказа #' + order.id,
		})

		if (!paymentData) {
			throw new Error('Payment data not found')
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		})

		const paymentUrl = paymentData.confirmation.confirmation_url //Ссылка которая будет перенаправлять на yookassa

		await sendEmail(
			data.email,
			`Next Pizza / Оплатите заказ #${order.id}`,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl,
			})
		)

		return paymentUrl
	} catch (error) {
		console.error('[CreateOrder] Server error', error)
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession()

		if (!currentUser) {
			throw new Error('User not found')
		}

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		})

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password
					? hashSync(body.password as string, 10)
					: findUser?.password,
			},
		})
	} catch (err) {
		console.log('Error [CREATE_USER]', err)
		throw err
	}
}
