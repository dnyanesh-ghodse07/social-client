import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from './authAction';

interface InitializeState{
  username: string | null,
  userId: string | null,
  token: string | null,
  isAuthenticated: boolean
}

const initialState:InitializeState = {
  username: localStorage.getItem('username') || null,
  userId: localStorage.getItem('userId') || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.username = null;
        state.userId = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
