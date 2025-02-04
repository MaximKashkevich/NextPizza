import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../prisma/prisma-client'

export async function GET(req: NextRequest) {
	try {
		const userId = 1
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ items: [] })
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						userId,
					},
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
								product: {
									ingredients: true,
								},
							},
						},
					},
				},
			},
		})

		// Если корзина была найдена, возвращаем ее
		if (userCart) {
			return NextResponse.json({ userCart })
		}

		// Если корзины не найдены, возвращаем пустую корзину
		return NextResponse.json({ cart: [] })
	} catch (err) {
		console.log(err)
		return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
	}
}
