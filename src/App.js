import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStockStatus, fetchStock } from './redux/stock/stockSlice';

import PatientForm from './pages/PatientForm';
import './app.scss';
import Navbar from './pages/navbar/Navbar';
import Stock from './pages/stock/Stock';
import Home from './pages/Home/Home';
import NewStock from './pages/stock/NewStock';
import Logs from './pages/stock/Logs';
import UpdateStock from './pages/stock/UpdateStock';
import UpdateItem from './pages/stock/UpdateItem';

function App() {
  const dispatch = useDispatch();
  const stockStatus = useSelector(getStockStatus);

  useEffect(() => {
    if (stockStatus === 'idle') {
      dispatch(fetchStock());
    }
  }, [stockStatus, dispatch]);

  return (
    <div className="App d-flex">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="add-patient" element={<PatientForm />} />
            <Route path="stock" element={<Stock />} />
            <Route path="stock/new" element={<NewStock />} />
            <Route path="stock/logs" element={<Logs />} />
            <Route path="stock/update" element={<UpdateStock />} />
            <Route path="stock/update-item" element={<UpdateItem />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
