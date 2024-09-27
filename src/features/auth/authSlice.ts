import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from './authAction';

interface InitializeState{
  user: unknown | null,
  token: string | null,
  isAuthenticated: boolean
}

const initialState:InitializeState = {
  user: null,
  token: localStorage.getItem('token') || null, // Initialize from localStorage
  isAuthenticated: !!localStorage.getItem('token')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
