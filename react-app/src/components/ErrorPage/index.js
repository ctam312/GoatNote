import './ErrorPage.css'
import goatgif from './404goat.gif'

import { Link } from 'react-router-dom';

export default function ErrorGoat() {
	return (
		<div id='fullErrorDiv'>
			<div className='errorImgDiv'>
			<img
				src= {goatgif}
				alt='lost goat'
				/>
			</div>
			<Link to='/'>Click here to return to Home</Link>
		</div>
	);
}