import React, { Fragment, useEffect, useState } from 'react';			
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {userSelector, signUpUser, clearState} from '../../features/userSlice';
import { TailSpin } from  'react-loader-spinner'
import "./index.css"

const Signup = () => {
	const dispatch = useDispatch();
  const navigate = useNavigate();
  	
	const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector)


  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    dispatch(clearState())
  };

	const onSubmit = (e) => {
      e.preventDefault();
    	dispatch(signUpUser(data));
  	};

  if(isSuccess){
    navigate("/")
  }


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
            {isFetching ? 
            (
              <TailSpin color="black" height={20} width={30} />
            ): ""
          } Sign Up
          </button>
        </form>
    </div>
	)
}

export default Signup