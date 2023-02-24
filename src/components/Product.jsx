import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from './StateProvider';
import { motion } from 'framer-motion';

const Product = ({
	image = 'https://www.unsplah.it/300/500',
	id,
	name = 'product name',
	price = 12.99,
	rating = 3,
	loading = 'lazy',
}) => {
	const [{ basket }, dispatch] = useStateValue();
	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};
	const addToBasket = () => {
		dispatch({
			type: 'ADD_TO_BASKET',
			item: {
				name: name,
				price: price,
				rating: rating,
				image: image,
				id: id,
			},
		});
	};
	return (
		/* PRODUCT */
		<motion.div
			className={`${item} bg-white min-w-[100px] transition-all hover:shadow-2xl flex flex-col w-screen m-[10px] p-[20px] shadow-xl`}>
			{/* ----PRODUCT HEADER---- */}
			<div className='product__header pt-2 pb-3'>
				<h2>{name}</h2>
				{/* PRODUCT PRICE */}
				<small>$</small>
				<strong>{price}</strong>
				{/* PRODUCT RATING*/}
				<div className='flex'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<StarIcon key={i} />
						))}
				</div>
			</div>
			{/* PRODUCT BODY */}
			<div className='flex items-center flex-col'>
				{/* PRODUCT IMAGE */}
				<div className='py-1'>
					<img
						loading={loading}
						className='flex max-h-[200px] bg w-full object-contain'
						src={image}
						alt='Product image'
					/>
				</div>
				<button
					onClick={addToBasket}
					className='w-28 h-6 text-center text-ellipsis mt-2 btn rounded-md text-slate-700'>
					Add to Basket
				</button>
			</div>
		</motion.div>
	);
};

export default Product;
