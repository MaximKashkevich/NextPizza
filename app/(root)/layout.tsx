import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Header } from '../../shared/components/shared'

export const metadata: Metadata = {
	title: 'Next Pizza | Главная',
}

export default function HomeLayout({
	children,
	mod,
}: Readonly<{
	children: React.ReactNode
	mod: React.ReactNode
}>) {
	return (
		<main className='min-h-screen'>
			<Suspense>
				<Header />
			</Suspense>
			{children}
			{mod}
		</main>
	)
}
