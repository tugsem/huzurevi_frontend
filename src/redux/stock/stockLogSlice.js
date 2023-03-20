import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { STOCK_LOG_URL } from '../../config/api';

const initialState = {
  stockLogs: [],
  status: 'idle', // 'idle' | 'loading' | 'succeed' | 'failed'
  error: null,
};

export const fetchStockLogs = createAsyncThunk('stock/fetchStockLogs', async () => {
  try {
    const response = await axios.get(STOCK_LOG_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addStockLog = createAsyncThunk('stock/addStockLog', async (payload) => {
  try {
    const response = await axios.post(STOCK_LOG_URL, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const removeStockLog = createAsyncThunk('stock/removeStockLog', async (id) => {
  await axios.delete(STOCK_LOG_URL + id);
  return id;
});

/* eslint-disable */
export const stockLogSlice = createSlice({
  name: 'stockLogs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStockLogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stockLogs = action.payload;
      })
      .addCase(fetchStockLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStockLog.fulfilled, (state, action) => {
        state.status = 'idle';
        state.stockLogs.push(action.payload);
      })
      .addCase(removeStockLog.fulfilled, (state, action) => {
        const stockLogs = state.stockLogs.filter((item) => item.id !== action.payload);
        state.stockLogs = stockLogs;
      })
  },
});
/* eslint-enable */
export const getStockLogs = (state) => (Array.isArray(state.stockLogs.stockLogs)
  ? state.stockLogs.stockLogs
  : []);
export const getStockLogsStatus = (state) => state.stockLogs.status;
export const getStockLogError = (state) => state.stockLogs.error;

export default stockLogSlice.reducer;
