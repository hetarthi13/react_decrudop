import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/UserSlice';  // Default import

export const store = configureStore({
  reducer: {
    user: userReducer,  // Assign the reducer to the 'user' key in the state
  },
});
