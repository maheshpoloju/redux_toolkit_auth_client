import React, { Fragment, useEffect, useState } from 'react';			
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {userSelector, signUpUser} from '../../features/userSlice';
import "./index.css"

const Signup = () => {
	const dispatch = useDispatch();
  const navigate = useNavigate();
  	
	const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector)
	// console.log(props)

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

	const onSubmit = (e) => {
      e.preventDefault();
    	dispatch(signUpUser(data));
  	};
  	useEffect(() => {
	  if (isSuccess) {
	    // dispatch(clearState())
	    navigate("/")
	  }
	  // if (isError) {
	  //   dispatch(clearState())
	  // }
	}, [isSuccess, isError])


  const token = localStorage.getItem('userToken')
    // console.log('usetoken', token)
    if (token !== null){
      return <Navigate to="/" />
  }

	return(
	  <div className='signup_container'>
        <form className='register-form-container' onSubmit={onSubmit}>
          <h1 className='create-account-heading'>Create an Account</h1>
          <input
            type="text"
            placeholder="First Name"
            name="username"
            onChange={handleChange}
            value={data.username}
            required
            className='input'
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className='input'
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className='input'
          />
          {isError && <div className='sign-up-error-message'>{errorMessage}</div>}
          <button type="submit" className='sign-up-button'>
            Sign Up
          </button>
        </form>
    </div>
	)
}

export default Signup