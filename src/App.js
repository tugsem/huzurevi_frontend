/* eslint-disable */
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './app.scss';

import Stock from './pages/stock/Stock';
import Login from './pages/Login/Login';

const App = () => {
  const isLogged = localStorage.getItem('isLogged') || 0;

  return (
    <div className="App d-flex justify-content-center">
      <Routes>
        {isLogged ? (
           <Route index path="/" element={<Stock />} />
        ) : (<Route index path="/" element={<Login />} />)
      }
      </Routes>
    </div>
  );
};

export default App;
