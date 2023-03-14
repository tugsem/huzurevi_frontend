import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStockStatus, fetchStock } from './redux/stock/stockSlice';
import { ReactComponent as BgShape } from './assets/big-shape.svg';
import './app.scss';

import Stock from './pages/stock/Stock';
import NewStock from './pages/stock/NewStock';
import Logs from './pages/stock/logs/Logs';
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
    <div className="App d-flex justify-content-center">
      <BgShape className="bg-shape" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stock />} />
          <Route path="new" element={<NewStock />} />
          <Route path="logs" element={<Logs />} />
          <Route path="update" element={<UpdateStock />} />
          <Route path="update-item" element={<UpdateItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
