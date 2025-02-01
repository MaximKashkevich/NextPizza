export const mapPizzaSize = {
	20: 'Маленькая',
	30: 'Средняя',
	40: 'Большая',
} as const

export const mapPyzzaType = {
	1: 'традиционная',
	2: 'тонкая',
} as const

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
	name,
	value,
}))

export const pizzaTypes = Object.entries(mapPyzzaType).map(([value, name]) => ({
	name,
	value,
}))

export type PizzaSizes = keyof typeof mapPizzaSize

export type PizzaTypes = keyof typeof mapPyzzaType
