import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import stockReducer from './stock/stockSlice';
import stockLogReducer from './stock/stockLogSlice';
import patientSliceReducer from './patient/patientSlice';

export const store = configureStore({
  reducer: {
    stock: stockReducer,
    stockLogs: stockLogReducer,
    patients: patientSliceReducer,
  },
  middleware: [thunk],
});

export default store;
