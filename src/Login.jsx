import { useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';

const Login = () => {
	const history = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then(() => history('/'))
			.catch((error) => alert(error.message));
	};

	const register = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((auth) => {
				if (auth) {
					history('/');
				}
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className='container mx-auto w-screen h-screen bg-white overflow-y-hidden'>
			<img
				className='w-[150px] -mt-7 object-contain mx-auto'
				src='/logo.png'
				alt='Amazon Logo'
			/>
			<div className='flex border border-slate-300 flex-col mx-auto max-w-[450px] pt-5 pb-4 px-4 bg-white rounded-md'>
				<h1 className='font-extrabold text-2xl mb-1'>Sign-in</h1>
				<div className='relative mt-5 mb-4 flex flex-col group'>
					<input
						className='rounded py-1.5 pl-2 pr-2 focus:ring-2 ring-orange-500 bg-slate-100 outline-none peer'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						name='userEmail'
						type='email'
						placeholder='examplt@gmail.com'
						id='email'
					/>
					<label
						className='text-slate-500 font-medium absolute left-3 top-1 bottom-0 peer-empty:-top-6 peer-empty:-left-0
                        transition-all duration-200'
						htmlFor='email'>
						E-mail
					</label>
				</div>
				<div className='relative flex flex-col mt-2'>
					<input
						className='rounded py-1.5 pl-2 pr-2 focus:ring-2 ring-orange-500 peer bg-slate-100 outline-none'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='example124*&@!*#'
						type='password'
						name='userPassword'
						id='password'
					/>
					<label
						className='text-slate-500 font-medium absolute left-3 top-1 bottom-0 peer-empty:-top-6 peer-empty:-left-0 transition-all duration-200'
						htmlFor='password'>
						Password
					</label>
				</div>
				<button
					type='submit'
					onClick={signIn}
					className='btn w-full py-1.5 transition-colors text-black ml-1 my-5 rounded'>
					Sign In
				</button>
				<p className='text-slate-600 text-left w-[90%] mx-auto '>
					By signing-in you agree to the Amazon FAKE Clone
					conditionals of use & sale. Please see our Privacy notice,
					our Cookies notice and our interest-based Adds notice{' '}
				</p>
				<button
					onClick={register}
					className='border border-slate-300 bg-slate-50 w-fit px-2 py-1 transition-colors mt-4 mb-5 mx-auto rounded text-slate-600'>
					Create your Amazon account
				</button>
			</div>
		</div>
	);
};
export default Login;
