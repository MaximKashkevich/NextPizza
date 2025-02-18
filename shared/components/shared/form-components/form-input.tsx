import { useFormContext } from 'react-hook-form'
import { RequiredSymbol } from '..'
import { Input } from '../../ui'
import { ClearButton } from '../clear-button'
import { ErrorText } from '../error-text'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	className?: string
	required?: boolean
}

export const FormInput: React.FC<Props> = ({
	className,
	name,
	label,
	required,
	...props
}) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext()

	const value = watch(name)
	const errorText = errors[name]?.message as string

	const onClickClear = () => {
		setValue(name, '')
	}

	return (
		<div className={className}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className='relative'>
				<Input className='h-12 text-md' {...register(name)} {...props} />

				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && (
				<ErrorText text='Поле обязательное для заполнения' className='mt-2' />
			)}
		</div>
	)
}
