import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from './StateProvider';

const CheckoutProduct = ({ image, key, price, rating, name }) => {
	const [{ basket }, dispatch] = useStateValue();
	function removeItem() {
		dispatch({
			type: 'REMOVE_FROM_BASKET',
			key: key,
		});
	}
	return (
		<div className='flex pb-2 overflow-hidden pt-2 container1 items-start border-b max-md:flex-col'>
			{/* product image */}
			<img
				className='w-[150px] object-contain max-md:self-center'
				src={image}
				alt={name}
			/>
			{/* PRODUCT BODY */}
			<div className='flex ml-6 pt-3 flex-col h-full pb-2'>
				<div className=' max-md:self-center'>
					<h2 className='font-extrabold max-w-[360px]'>{name}</h2>
					<small>$</small>
					<strong className='font-medium'>{price}</strong>
				</div>
				<div className='flex mb-4  max-md:self-start'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<StarIcon />
						))}
				</div>
				<div className='max-md:self-end max-md:pr-2'>
					<button
						onClick={removeItem}
						className='btn w-fit rounded px-2 py-[1px]'>
						Remove from basket
					</button>
				</div>
			</div>
		</div>
	);
};

export default CheckoutProduct;
