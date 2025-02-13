import { prisma } from '../../prisma/prisma-client'

export const findOrCreateCart = async (token: string, userId: number) => {
	let userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
	})

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				token,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}

	return userCart
}
