import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Next Pizza | Главная',
}

export default function HomeLayout({
	children,
	modal,
}: {
	children: ReactNode
	modal: ReactNode
}) {
	return (
		<main className='min-h-screen'>
			{children}
			{modal}
		</main>
	)
}
