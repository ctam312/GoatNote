import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import './Navigation.css';
import CreateNoteButton from '../CreateNote';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<li>
				<CreateNoteButton />
			</li>
			{isLoaded && (
				<li>
					<LogoutButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;