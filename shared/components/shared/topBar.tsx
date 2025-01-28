'use client'

import { Category } from '@prisma/client'
import React from 'react'
import { cn } from '../../lib/utils'
import { Categories, Container, SortPopup } from './index'

interface Props {
	categories: Category[]
	className?: string
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
	return (
		<div
			className={cn(
				'sticky top-0 bg-white bg-opacity-10 backdrop-blur-md py-5 shadow-lg shadow-black/5 z-10 transition-opacity duration-300',
				className
			)}
		>
			<Container className='flex items-center justify-between'>
				<Categories items={categories} />
				<SortPopup />
			</Container>
		</div>
	)
}
