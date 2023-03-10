import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import './Navigation.css';
import CreateNoteButton from '../CreateNote';
import logo from '../Navigation/homegoat.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='sidebar-container'>
			<div className='sidebar-logo'>
				<a href="/">
			<img src={logo} id="homegoatlogo" alt="logo" />
				</a>
			</div>
			<div className='sidebar-home'>
				<NavLink exact to="/">Home</NavLink>
			</div>
			<div className='sidebar-create'>
				<CreateNoteButton />
			</div>
			<div className='sidebar-notebooks'>
				<NavLink exact to="/notebooks">Notebooks</NavLink>
			</div>
			{isLoaded && (
				<div className='sidebar-logout'>
					<LogoutButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;