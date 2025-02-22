import { OrderStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { PaymentCallbackData } from '../../../../@types/yookassa'
import { prisma } from '../../../../prisma/prisma-client'
import { OrderSuccessTemplate } from '../../../../shared/components/shared/email-templates/order-success'
import { sendEmail } from '../../../../shared/lib'
import { CartItemDTO } from '../../../../shared/services/dto/cart.dto'

export async function POST(req: NextRequest) {
	try {
		//Получили запрос от yookassa
		const body = (await req.json()) as PaymentCallbackData

		//Нашли заказ
		const order = await prisma.order.findFirst({
			where: {
				id: Number(body.object.metadata.order_id),
			},
		})

		if (!order) {
			return NextResponse.json({ error: 'Order not found' })
		}

		const isSucceeded = body.object.status === 'succeeded'

		//Обновляем статус на COMPLETED
		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded ? OrderStatus.COMPLETED : OrderStatus.CANCELLED,
			},
		})

		//Находим товары
		const items = order?.items as unknown as CartItemDTO[]

		if (isSucceeded) {
			await sendEmail(
				order.email,
				'Next Pizza / Ваш заказ успешно оформлен 🎉',
				OrderSuccessTemplate({ orderId: order.id, items })
			)
		} else {
			//Письмо о не успешной оплате
		}
	} catch (error) {
		console.log('[Checkout Callback] Error:', error)
		return NextResponse.json({ error: 'Server error' })
	}
}
