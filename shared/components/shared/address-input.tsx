'use client'

import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
	onChange?: (value?: string) => void
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token='a47ae9739ae5a20d7bea5eff596f35bcb58e8cb1'
			onChange={data => onChange?.(data?.value)}
		/>
	)
}
