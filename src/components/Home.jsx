import React from 'react';
import Product from './Product';
import { motion } from 'framer-motion';

const Home = () => {
	const container1 = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<div className='flex container flex-col justify-center mx-auto max-w-[1500px]'>
			<div className='-z-10'>
				<img
					className='home__image'
					src='/landing_page_image.jpg'
					alt='failed to load'
				/>
			</div>

			{/* PRODUCTS LIST */}
			<motion.div
				variants={container1}
				initial='hidden'
				animate='visible'
				className='flex flex-col max-md:pt-10 justify-center items-center '>
				{/* PRODUCTS FIRST ROW */}
				<div className='flex z-10 mx-[5px] w-full max-md:flex-wrap'>
					<Product
						id={1212424}
						name='Boat s32 random name headphone'
						price={33.99}
						image='/Beats_headphones-2.jpg'
						rating={3}
					/>
					<Product
						id={325564}
						price={11.99}
						name='Sony camera with macro lens'
						image='/cb4ed599.jpg'
						rating={4}
					/>
				</div>

				{/* PRODUCTS SECOND ROW WITH 3 PRODUCTS */}
				<div className='home__row flex h-auto w-full justify-evenly max-md:flex-wrap'>
					<Product
						id={812387}
						rating={5}
						price={82.99}
						name='Lenovo laptop with lights setup'
						image='/Image-12.jpg'
					/>
					<Product
						id={284947}
						price={12.99}
						name='Samsung S30 Ultra Pro 256GB storage 8GB RAM UFC Infrared 50 mega pixel camera'
						image='/original-03824621d1d708e1f75eda09d843d1da.webp'
						rating={5}
					/>
					<Product
						price={250.99}
						id={128470}
						name='New Apple macbook laptop with 32GB RAM / 256GB SSD'
						image='/product-technology-cellular-phone-black-and-white-wallpaper-preview.jpg'
						rating={4}
					/>
				</div>
				<div className='home__row flex w-full justify-evenly max-md:flex-wrap'>
					<Product
						price={200.99}
						id={284697}
						name='New Apple macbook laptop with 32GB RAM / 256GB SSD'
						image='/product-technology-cellular-phone-black-and-white-wallpaper-preview.jpg'
						rating={5}
					/>
				</div>
			</motion.div>
		</div>
	);
};

export default Home;
