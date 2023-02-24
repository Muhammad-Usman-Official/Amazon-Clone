import React, { useState, useEffect, Fragment } from 'react';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { motion } from 'framer-motion';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { calcTotal } from './Subtotal';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

function Payment() {
	const navigate = useNavigate();
	const [{ basket, user }, dispatch] = useStateValue();
	const stripe = useStripe();
	const elements = useElements();

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
	const style = {
		paymentWrapper: 'flex flex-col mx-2',
		paymentContainer: 'px-3 container',
		checkout: 'w-full font-bold py-2 text-center border-b border-slate-300',
		deliveryAddress:
			'border-b border-slate-300 px-3 gap-x-6 py-2 flex flex-wrap bg-white',
		address: 'text-gray-600',
		h3: 'font-medium text-gray-700 text-md ',
		productContainer:
			'flex border-b gap-x-7 border-slate-300 max-md:flex-col max-md:px-2 bg-white w-full pt-2 space-y-2',
		products: 'md:pt-10 md:pr-4 md:pl-10  ',
		paymentDetails: 'flex-[0.8]',
	};
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState('');
	const [clientSecret, setClientSecret] = useState(true);

	useEffect(() => {
		// generate the special stripw scret which allows us to charge a customer
		const getClientSecret = async () => {
			const response = await axios({
				method: 'post',
				url: `/Payment/create?total=${calcTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
		};
		getClientSecret();
	}, [basket]);

	const handleSubmit = async (event) => {
		// fancy submit functionality
		event.preventDefault();
		setProcessing(true);
		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				//paymentIntent = payment confirmation
				setSucceeded(true);
				setError(null);
				setProcessing(false);
				navigate.replace('/Orders');
			});
	};

	const handleChange = (event) => {
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};
	return (
		<div className={style.paymentWrapper}>
			<div className={style.paymentContainer}>
				<div className={style.checkout}>
					<h2>Checkout ({basket.length} items)</h2>
				</div>
				<div className={style.deliveryAddress}>
					<h3 className={style.h3}>Delivery Address</h3>
					<p>
						<address className={style.address}>
							{user?.email ? `${user?.email},` : null}
						</address>
						<address className={style.address}>
							123 Mian Channu,
						</address>
						<address className={style.address}>
							Punjab, Pakistan
						</address>
					</p>
				</div>
				<div className={style.productContainer}>
					<h3 className={`${style.h3} pb-2 pl-2`}>
						Review items and delivery
					</h3>
					{basket.length !== 0 ? (
						<motion.div
							variants={container1}
							initial='hidden'
							animate='visible'
							className={style.products}>
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
					) : (
						<Fragment>
							You have not added any item to the basket, please
							add some :)
						</Fragment>
					)}
				</div>
				{/* Payment container */}
				<div className='bg-white px-2 py-2 flex'>
					{/* payment header */}
					<div className='w-max flex-[0.2]'>
						<h3 className={style.h3}>Payment Methods</h3>
					</div>
					{/* payment details */}
					<div className={`${style.paymentDetails}`}>
						<form
							className='space-y-2 mt-1 px-2'
							onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className='w-fit  border border-gray-400 rounded py-2 px-6'>
								<CurrencyFormat
									renderText={(value) => (
										<h3
											className={`${style.h3} text-md font-bold`}>
											Orders Total:{' '}
											<strong>{value}</strong>
										</h3>
									)}
									decimalScale={2}
									value={calcTotal(basket)}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>

								<button
									type='button'
									className='btn px-2 mt-2 mb-1 ml-0.5 rounded-sm cursor-pointer'
									disabled={
										disabled || succeeded || processing
									}>
									<span>
										{processing ? (
											<p>Processing</p>
										) : (
											'Buy Now'
										)}
									</span>
								</button>
							</div>
							{/* errors */}
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
