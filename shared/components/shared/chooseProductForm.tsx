import { cn } from '../../lib/utils'
import { Button } from '../ui'
import { Title } from './title'

interface Props {
	imageUrl: string
	name: string
	price: number
	// loading?: boolean
	onSubmit?: VoidFunction
	className?: string
}

export const ChooseProductForm: React.FC<Props> = ({
	name,
	imageUrl,
	className,
	onSubmit,
	price,
}) => {
	return (
		<div className={cn(className, 'flex flex-1')}>
			{/* <ProductImage imageUrl={imageUrl} size={30} /> */}
			<div className='flex items-center justify-center flex-1relative w-full'>
				<img
					src={imageUrl}
					alt={name}
					className='relative left-2 top-2 transtion-all-2 z-10 duration-300 w-[350px] h-[350px]'
				/>
			</div>
			<div className='w-[490px] bg-[#f7f6f5] p-7'>
				<Title text={name} size='md' className='mb-1 font-extrabold' />
				<Button
					onClick={() => onSubmit?.()}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
				>
					Добавить в корзину за {price} ₽
				</Button>
			</div>
		</div>
	)
}
