import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import { motion } from 'framer-motion';

const Checkout = () => {
	const [{ basket, user }, dispatch] = useStateValue();
	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};
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
		<div className='bg-white flex w-full container mx-auto'>
			{/*  */}
			<div className='flex flex-col'>
				<div className='p-2 mt-4'>
					<img
						className='object-contain'
						src='/checkout_page_top_image.jpg'
						alt='failed to load image'
					/>
					<div className='max-md:block max-md:mt-5 lg:hidden'>
						<Subtotal />
					</div>
				</div>
				<div className='mx-6 mt-2 pl-2 flex flex-wrap'>
					<h2>{user ? `Hey, ${user.email}, ` : null}</h2>
					{user ? <h2>hope you are having good day!</h2> : null}
				</div>
				<div className=' mx-6 mt-2 pl-2 gap-2 flex flex-col'>
					<h2 className='border-b-2 font-semibold font-mono'>
						Your shopping Basket
					</h2>
					<motion.div
						variants={container1}
						initial='hidden'
						animate='visible'
						className='flex container flex-col justify-center gap-4 transition-all'>
						{basket.map((product, i) => (
							<CheckoutProduct
								className={item}
								key={product.key}
								rating={product.rating}
								name={product.name}
								price={product.price}
								image={product.image}
							/>
						))}
					</motion.div>
				</div>
			</div>
			<div className='p-5 bg-blue-500 max-md:hidden lg:block'>
				<Subtotal />
			</div>
		</div>
	);
};

export default Checkout;
