import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../prisma/prisma-client'
import { findOrCreateCart } from '../../../shared/lib/find-or-create-cart'
import { updateCartTotalAmount } from '../../../shared/lib/update-cart-total-amount'
import { CreateCartItemValues } from '../../../shared/services/dto/cart.dto'

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] })
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						token,
					},
				],
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		})

		return NextResponse.json(userCart)
	} catch (error) {
		console.log('[CART_GET] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось получить корзину' },
			{ status: 500 }
		)
	}
}
export async function POST(req: NextRequest) {
	try {
		// Получаем токен корзины из куки
		let token = req.cookies.get('cartToken')?.value || crypto.randomUUID()

		// Получаем userId, если он есть (например, из запроса)
		const { userId, productItemId, ingredients } =
			(await req.json()) as CreateCartItemValues & { userId?: number }

		if (userId === undefined) {
			return NextResponse.json(
				{ message: 'userId обязателен' },
				{ status: 400 }
			)
		}

		// Создаем или находим корзину
		const userCart = await findOrCreateCart(token, userId)

		// Проверяем, есть ли уже этот товар в корзине (с этими же ингредиентами)
		const existingCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId,
				ingredients: {
					every: {
						id: { in: ingredients },
					},
				},
			},
		})

		if (existingCartItem) {
			// Если товар уже есть, увеличиваем количество
			await prisma.cartItem.update({
				where: { id: existingCartItem.id },
				data: { quantity: existingCartItem.quantity + 1 },
			})
		} else {
			// Если товара нет, создаем новый
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId,
					quantity: 1,
					ingredients: { connect: ingredients?.map(id => ({ id })) },
				},
			})
		}

		// Обновляем общую сумму корзины
		const updatedUserCart = await updateCartTotalAmount(token)

		// Отправляем обновленные данные и устанавливаем токен в куки
		const resp = NextResponse.json(updatedUserCart)
		resp.cookies.set('cartToken', token)
		return resp
	} catch (error) {
		console.error('[CART_POST] Server error:', error)
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 }
		)
	}
}
