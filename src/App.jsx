import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Checkout from './components/Checkout';
import Login from './Login';
import NotFound from './components/NotFound';
import { auth } from './firebase';
import { useStateValue } from './components/StateProvider';
import Payment from './components/Payment';
import Orders from './components/Orders';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(
	'pk_test_51MdBjOFmMWRpZvX3dm7JTjkl77jxyjqpw5xnSJilDZ2qo58JqPXpJypXRMqwE5YNiP7NVxhmsnunZSSUdOmsIFRx00yGSQdmUq'
);

const App = () => {
	const [{}, dispatch] = useStateValue();
	useEffect(() => {
		// will only run once when the app component loads...
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// the user just logged in /the user was logged in
				dispatch({
					type: 'SET_USER',
					user: authUser,
				});
			} else {
				//the user is logged out /the user is not logged in
				dispatch({
					type: 'SET_USER',
					user: null,
				});
			}
		});
	}, []);
	return (
		<Router>
			<div className='App'>
				<Routes>
					<Route path='/Login' element={<Login />} />
					<Route element={<NotFound />} />
				</Routes>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Checkout' element={<Checkout />} />
					<Route
						path='/Checkout/Payment'
						element={
							<>
								<Elements stripe={promise}>
									<Payment />
								</Elements>
							</>
						}
					/>
					<Route
						path='/Checkout/Payment'
						element={
							<>
								<Orders />
							</>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
