import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from '../firebase';
const Navbar = () => {
	const [{ basket, user }, dispatch] = useStateValue();

	const handleAuthentication = () => {
		if (user) {
			auth.signOut();
		}
	};
	return (
		<div className='bg-black sticky left-0 right-0 top-0 z-50'>
			<div className='flex mx-auto items-center container py-1 pl-4 justify-center'>
				{/* HEADER LOGO */}
				<Link to='/' className='flex items-center'>
					<img
						className='w-16 mt-2 text-white'
						src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
						alt='Amazon'
					/>
				</Link>
				{/* HEADER INPUT */}
				<div className='navbar__input flex flex-1'>
					<input
						className='ml-4 max-sm:w-16 w-full flex flex-1 focus:ring-2 ring-orange-500 outline-none rounded-l-sm px-2 text-xs'
						type='text'
						placeholder='Search...'
					/>
					<SearchIcon className='text-white bg-orange-400 rounded-r-sm mr-4' />
				</div>
				<div className='navbar__nav-links gap-x-4 flex text-white '>
					<Link to={!user && './Login'}>
						<div
							onClick={handleAuthentication}
							className='flex flex-col justify-center items-center'>
							<small className='text-[12px] text-white'>
								{user ? user.email : 'Hello, Guest'}
							</small>
							<strong className='text-xs'>
								{user ? 'Sign out' : 'Sign In?'}
							</strong>
						</div>
					</Link>
					<div className='navbar__orders flex items-center max-sm:hidden justify-center flex-col '>
						<span className='text-[10px]'>Returns &</span>
						<span className='text-sm'>Orders</span>
					</div>
					<div className='flex items-center'>
						<Link
							to='./Checkout'
							className='navbar__cart pr-3 flex'>
							<ShoppingCartIcon />
							<span>{basket?.length}</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
