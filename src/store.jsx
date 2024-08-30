// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './ItemsSlice';
import authReducer from './Authslice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    auth: authReducer,

  },
});
