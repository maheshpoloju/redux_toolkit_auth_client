import React from 'react';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	  username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
}

export const signUpUser = createAsyncThunk(
  "users/register",
  async ({ username, email, password }, thunkAPI) => {
    // console.log("reqBody", username)
    try {
      const response = await fetch(
        "http://localhost:8080/api/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      )
      let {data, message} = await response.json()
      if (response.status === 200) {
        return { data, message}
      } else {
        console.log("Error", message)
        return thunkAPI.rejectWithValue(message)
      }
    } catch (e) {
      // console.log("Error", e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      let {data, message} = await response.json();
      // console.log('message', message);
      if (response.status === 200) {
        localStorage.setItem('userToken', data);
        return {data, message};
      } else {
        // console.log('message', message);
        return thunkAPI.rejectWithValue(message);
      }
    } catch (e) {
      // console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {},
	extraReducers: {
		  [signUpUser.fulfilled]: (state, { payload }) => {
	      state.isFetching = false;
	      state.isSuccess = true;
        state.isError = false;
        state.email = payload.data.email;
        state.username = payload.data.username;
	    },
	    [signUpUser.pending]: (state) => {
	      state.isFetching = true;
	    },
	    [signUpUser.rejected]: (state, { payload }) => {
	      state.isFetching = false;
	      state.isError = true;
	      state.errorMessage = payload;
	    },
      [loginUser.fulfilled]: (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.isError = false;
        return state;
      },
      [loginUser.rejected]: (state, { payload }) => {
        // console.log('payload', payload);
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload;
      },
      [loginUser.pending]: (state) => {
        state.isFetching = true;
      },
  }	
})
export default userSlice.reducer
// export const {} = userSlice.actions
export const userSelector = (state) => state.user;