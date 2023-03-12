import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientForm from './pages/PatientForm';
import './app.scss';
import Navbar from './pages/navbar/Navbar';
import Stock from './pages/stock/Stock';
import Home from './pages/Home/Home';
import NewStock from './pages/stock/NewStock';
import Logs from './pages/stock/Logs';
import UpdateStock from './pages/stock/UpdateStock';

function App() {
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
