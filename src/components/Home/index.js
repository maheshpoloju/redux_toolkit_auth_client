import React, { Fragment, useEffect, useState } from 'react';		
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {userSelector, getUser, clearState} from '../../features/userSlice';
import "./index.css"

const Home = () => {
	const { username } = useSelector(userSelector)

	const navigate = useNavigate()
	const dispatch = useDispatch();

	useEffect(() => {
    	const jwtToken = localStorage.getItem("userToken")
    	dispatch(getUser(jwtToken))
  	}, []);

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