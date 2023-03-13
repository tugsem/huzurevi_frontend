import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import stockReducer from './stock/stockSlice';
import stockLogReducer from './stock/stockLogSlice';

export const store = configureStore({
  reducer: {
    stock: stockReducer,
    stockLogs: stockLogReducer,
  },
  middleware: [thunk],
});

export default store;
