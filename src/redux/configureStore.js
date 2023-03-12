import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import stockReducer from './stock/stockSlice';

export const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
  middleware: [thunk],
});

export default store;
