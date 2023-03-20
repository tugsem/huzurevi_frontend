import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStockStatus, fetchStock } from './redux/stock/stockSlice';
import './app.scss';

import Stock from './pages/stock/Stock';
import NewStock from './pages/stock/NewStock';
import Logs from './pages/stock/logs/Logs';
import UpdateStock from './pages/stock/UpdateStock';
import UpdateItem from './pages/stock/UpdateItem';
// import Login from './pages/Login/Login';

const App = () => {
  const dispatch = useDispatch();
  const stockStatus = useSelector(getStockStatus);

  useEffect(() => {
    if (stockStatus === 'idle') {
      dispatch(fetchStock());
    }
  }, [stockStatus, dispatch]);

  return (
    <div className="App d-flex justify-content-center">
      <Routes>
        <Route path="/" element={<Stock />} />
        <Route path="new" element={<NewStock />} />
        <Route path="logs" element={<Logs />} />
        <Route path="update" element={<UpdateStock />} />
        <Route path="update-item" element={<UpdateItem />} />
        {/* <Route path="login" element={<Login />} /> */}
      </Routes>
    </div>
  );
};

export default App;
