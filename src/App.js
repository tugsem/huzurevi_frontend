/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './app.scss';

import Stock from './pages/stock/Stock';
import AddPatient from './pages/patient/AddPatient';
import Login from './pages/Login/AdminLogin';
import PatientList from './pages/patient/PatientList';
import UserLogin from './pages/Login/UserLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminNavbar from './pages/navbar/AdminNavbar';

const App = () => {
const [authenticated, setAuthenticated] = useState(false);
// const [currentUser, setCurrentUser] = useState(null);

useEffect(() => {
  console.log(authenticated)
  fetch('/me').then((res)=> {
    if (res.ok) {
      return res.json().then(()=> {
        // setCurrentUser(user);
        setAuthenticated((prev) => {
          prev = !prev
        });
      })
    }
  })
}, [])

  return (
    <div className="App d-flex justify-content-center">
      {user === 'admin' ? (
          <>
          <AdminNavbar />
              <Routes>
                <Route path='/' element={<AdminDashboard />} />
                <Route path='/patients' element={<PatientList />} />
                <Route path='/add-patient' element={<AddPatient/>} />
                <Route path='/stock' element={<Stock />} />
              </Routes>
          </>
        ) : user === 'user' ? (
        <Routes>
          <Route path='/' element={<PatientList />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<UserLogin />} />
          <Route path='/admin' element={<Login />} />
        </Routes>
      )
    }
    </div>
  )
};

export default App;
