import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';

const calcTotal = (array) => {
	return array.reduce((val1, val2) => val1 + val2.price, 0);
};
const Subtotal = () => {
	const [{ basket }, dispatch] = useStateValue();
	const navigate = useNavigate();
	return (
		<div className='w-[300px] h-[150px] flex rounded-[3px] flex-col justify-between p-[20px] bg-[#f3f3f3] border-2 border-[#dddddddd]'>
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({basket.length} items):{' '}
							<strong>{value}</strong>
						</p>
						<small>
							<input className='mr-1' type='checkbox' />
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={calcTotal(basket)}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'$'}
			/>
			<button
				onClick={() => navigate('./Payment')}
				className='btn-subtotal btn'>
				Proceed to checkout
			</button>
		</div>
	);
};
export default Subtotal;
export { calcTotal };
