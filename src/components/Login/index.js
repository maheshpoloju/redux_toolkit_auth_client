import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, Navigate} from 'react-router-dom';
import {userSelector, loginUser, clearState} from '../../features/userSlice';
import { TailSpin } from  'react-loader-spinner'
import './index.css'

const Login = () => {

	const [data, setData] = useState({ email: "", password: "" })

	
	const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    	userSelector
  	);

	const dispatch = useDispatch();
	const navigate = useNavigate();



	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
		dispatch(clearState())
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(loginUser(data));
		navigate("/")
	}
	const hadnleRegisterButton = () => {
		navigate("/register")
	}

	// useEffect(() => {
	// 	if(isError){
	// 		dispatch(clearState())
	// 	}
	// }, [isError])

	const token = localStorage.getItem('userToken')
	// console.log('usetoken', token)
	if (token !== null){
		return <Navigate to="/" />
	}
	

	return(
		<div className='login_container'>
			<form className='form_container' onSubmit={handleSubmit}>
				<h1 className='login-heading'>Login to your Account</h1>
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
				{isError && (<div className='error_msg'>{errorMessage}</div>)}
				<button type="submit" className='sign-in-button'>
					{isFetching ? 
						(
							<TailSpin color="black" height={20} width={30} />
						): ""
					} Sign In
				</button>
			</form>

			<h4>OR</h4>

			<button onClick={hadnleRegisterButton} type="submit" className='sign-in-button'>
					Register Here
			</button>

		</div>
	)
}

export default Login