'use client'

import React from 'react'
import { Input } from '../../ui'
import { AdressInput } from '../address-input'
import { FormTextarea } from '../form-components/form-textarea'
import { WhiteBlock } from '../white-block'

interface Props {
	className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title='3. Адрес доставки'>
			<div className='flex flex-col gap-5'>
				<Input name='firstName' className='text-base' placeholder='Имя' />

				<AdressInput />

				<FormTextarea
					name='comment'
					className='text-base'
					rows={5}
					placeholder='Комментарий к заказу'
				/>
			</div>
		</WhiteBlock>
	)
}
