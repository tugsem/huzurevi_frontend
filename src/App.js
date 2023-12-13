/* eslint-disable */
import React, { useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import './app.scss';

import Stock from './pages/stock/Stock';
import AddPatient from './pages/patient/AddPatient';
import Login from './pages/Login/Login';
import PatientList from './pages/patient/PatientList';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminNavbar from './pages/navbar/AdminNavbar';
import { USER_URL } from './config/api';
import SignupForm from './pages/SignUpForm';

const App = () => {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [currentUser, setCurrentUser] = useState(null);

useEffect(()=>{
  fetch(USER_URL).then((res) => {
    if(res.ok) {
      res.json().then(() => {
        setIsAuthenticated(true);
    }) } else {
      setIsAuthenticated(false);
    }
  })
}, [currentUser]);

if (!isAuthenticated) {
  return (
    <Routes>
    <Route index path='/' element={<Login setCurrentUser={setCurrentUser}/>} />
    <Route path='/signup' element={<SignupForm setCurrentUser={setCurrentUser}/>} />
  </Routes>
  )
}
  return (
    <div className="App d-flex justify-content-center">
          <>
          <AdminNavbar/>
              <Routes>
                <Route path='/' element={<AdminDashboard />} />
                <Route path='/patients' element={<PatientList />} />
                <Route path='/add-patient' element={<AddPatient/>} />
                <Route path='/stock' element={<Stock />} />
              </Routes>
          </>
    </div>
  )
};

export default App;
