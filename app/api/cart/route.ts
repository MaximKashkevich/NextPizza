import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../prisma/prisma-client'

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] })
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				token,
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
									include: {
										ingredients: true,
									},
								},
							},
						},
					},
				},
			},
		})


		if (userCart) {
			return NextResponse.json({ userCart })
		}

		return NextResponse.json({ items: [] })
	} catch (err) {
		console.error(err) 
		return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
	}
}
