import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// import postsReducer from '../features/posts/postsSlice';
import apiSlice from '../api/apiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,     // Handles authentication state
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
