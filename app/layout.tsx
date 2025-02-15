import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Header } from '../shared/components/shared'
import './globals.css'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
	title: 'Next Pizza | Главная',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<link data-rh='true' rel='icon' href='/logo.png' />
			</head>
			<body className={`${nunito.variable} ${nunito.variable} antialiased`}>
				<main className='min-h-screen'>
					<Header />
					{children}
					<Toaster />
				</main>
			</body>
		</html>
	)
}
