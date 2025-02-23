import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Title } from '../../../title'
import { TFormLoginValues, formLoginSchema } from './schemas'

import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Button } from '../../../../ui'
import { FormInput } from '../../../form-components/form-input'

interface Props {
	onClose?: VoidFunction
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
				callbackUrl: '/', // Добавляем URL, чтобы избежать ошибки с `callback`
			})

			console.log('🔍 Ответ от signIn:', resp)

			if (!resp?.ok) {
				throw new Error(resp?.error || 'Ошибка авторизации')
			}

			toast.success('Вы успешно вошли в аккаунт', { icon: '✅' })

			onClose?.()
		} catch (error) {
			console.error('❌ Ошибка входа:', error)
			toast.error('Не удалось войти в аккаунт', { icon: '❌' })
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-5'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex justify-between items-center'>
					<div className='mr-2'>
						<Title text='Вход в аккаунт' size='md' className='font-bold' />
						<p className='text-gray-400'>
							Введите свою почту, чтобы войти в свой аккаунт
						</p>
					</div>
					<img
						src='/assets/images/phone-icon.png'
						alt='phone-icon'
						width={60}
						height={60}
					/>
				</div>

				<FormInput name='email' label='E-Mail' required />
				<FormInput name='password' label='Пароль' type='password' required />

				<Button
					loading={form.formState.isSubmitting}
					className='h-12 text-base'
					type='submit'
				>
					Войти
				</Button>
			</form>
		</FormProvider>
	)
}
