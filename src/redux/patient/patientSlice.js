import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PATIENT_URL } from '../../config/api';

const initialState = {
  patients: [],
  status: 'idle', // 'idle' | 'loading' | 'succeed' | 'failed'
  error: null,
};

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
  try {
    const response = await axios.get(PATIENT_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addPatient = createAsyncThunk('patients/addPatient', async (payload) => {
  const response = await axios.post(PATIENT_URL, payload);
  return response.data;
});

export const removePatient = createAsyncThunk('patients/removePatient', async (id) => {
  await axios.delete(PATIENT_URL + id);
  return id;
});

export const updatePatient = createAsyncThunk('patients/updatePatient', async (payload) => {
  await axios.put(PATIENT_URL + payload.id, payload);
  return payload;
});

export const updateStatus = createAction('patients/updateStatus');

/* eslint-disable */
export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.patients = [action.payload, ...state.patients];
        state.status = 'idle';
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removePatient.fulfilled, (state, action) => {
        const patients = state.patients.filter((item) => item.id !== action.payload);
        state.patients = patients;
      })
      .addCase(updatePatient.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const patients = state.patients.map((item) => (item.id === updatedItem.id ? updatedItem : item));
        state.patients = patients;
        state.status = 'idle';
      })
      .addCase(updateStatus, (state) => {
        state.status = 'idle';
      });
  },
});

export const selectAllPatients = (state) => state.patients.patients || [];
export const getPatientsStatus = (state) => state.patients.status;
export const getPatientsError = (state) => state.patients.error;

export default patientsSlice.reducer;

