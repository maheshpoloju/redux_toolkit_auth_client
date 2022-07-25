import React, { Fragment, useEffect, useState } from 'react';		
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {userSelector} from '../../features/userSlice';
import "./index.css"

const Home = () => {
	const { username } = useSelector(userSelector)
	console.log('username', username)
	const navigate = useNavigate()

	const onLogOut = () => {
		localStorage.removeItem('userToken');
		navigate("/login")
	}

	return(
		<div className="home-div">
			<h1>Home</h1>
			<h1>Welcome... {username}</h1>
			<button className="logout-button" onClick={onLogOut}>Logout</button>
		</div>
	)
}

export default Home