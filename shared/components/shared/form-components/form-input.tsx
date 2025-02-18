import { RequiredSymbol } from '..'
import { Input } from '../../ui'
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
	return (
		<div className={className}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className='relative'>
				<Input className='h-12 text-md' {...props} />
			</div>

			<ErrorText text='Поле обязательное для заполнения' className='mt-2' />
		</div>
	)
}
