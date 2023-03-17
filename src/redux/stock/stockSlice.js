import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const STOCK_URL = 'http://localhost:3000/api/v1/stocks/';

const initialState = {
  stock: [],
  status: 'idle', // 'idle' | 'loading' | 'succeed' | 'failed'
  error: null,
};

export const fetchStock = createAsyncThunk('stock/fetchStock', async () => {
  try {
    const response = await axios.get(STOCK_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addStock = createAsyncThunk('stock/addStock', async (payload) => {
  const response = await axios.post(STOCK_URL, payload);
  return response.data;
});

export const removeStock = createAsyncThunk('stock/removeStock', async (id) => {
  await axios.delete(STOCK_URL + id);
  return id;
});

export const updateStockItem = createAsyncThunk('stock/updateStockItem', async (payload) => {
  await axios.put(STOCK_URL + payload.id, payload);
  return payload;
});
/* eslint-disable */
export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStock.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stock = action.payload;
      })
      .addCase(fetchStock.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStock.fulfilled, (state, action) => {
        state.stock = [action.payload, ...state.stock];
      })
      .addCase(removeStock.fulfilled, (state, action) => {
        const stock = state.stock.filter((item) => item.id !== action.payload);
        state.stock = stock;
      })
      .addCase(updateStockItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStockItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const stock = state.stock.map((item) => (item.id === updatedItem.id ? updatedItem : item));
        state.stock = stock;
        state.status = 'succeeded';
      });
  },
});

export const selectAllStock = (state) => Array.isArray(state.stock.stock) ? state.stock.stock : [];
export const getStockStatus = (state) => state.stock.status;
export const getStockError = (state) => state.stock.error;

export default stockSlice.reducer;
