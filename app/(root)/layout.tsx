import type { Metadata } from 'next'

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
			{children}
			{mod}
		</main>
	)
}
