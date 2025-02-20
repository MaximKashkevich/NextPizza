import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../ui'
import { CartButton, Container, SearchInput } from './index'

interface Props {
	className?: string
	hasCart?: boolean
	hasSearch?: boolean
}

export const Header: React.FC<Props> = ({
	hasSearch = true,
	hasCart = true,
	className,
}) => {
	return (
		<>
			<header className={cn('border-b', className)}>
				<Container className='flex items-center justify-between py-4 md:py-8'>
					{/* Левая часть */}
					<Link href='/'>
						<div className='flex items-center gap-2 md:gap-4'>
							<Image src='/logo.png' width={35} height={35} alt='logo' />
							<div className='hidden md:block'>
								<h1 className='text-xl md:text-2xl uppercase font-black'>
									Next Pizza
								</h1>
								<p className='text-xs md:text-sm text-gray-400'>
									вкусней уже некуда
								</p>
							</div>
						</div>
					</Link>
					{/* Поиск */}
					{hasSearch && (
						<div className='mx-4 flex-1 flex md:flex'>
							<SearchInput />
						</div>
					)}
					{/* Правая часть */}
					<div className='flex items-center gap-2 md:gap-3'>
						<Button variant='outline' className='gap-1'>
							<User size={16} />
							Войти
						</Button>
						{hasCart && (
							<div>
								<CartButton />
							</div>
						)}
					</div>
				</Container>
			</header>
		</>
	)
}
