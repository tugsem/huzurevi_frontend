/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './app.scss';

import Stock from './pages/stock/Stock';
import AddPatient from './pages/patient/AddPatient';
import Login from './pages/Login/Login';
import PatientList from './pages/patient/PatientList';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Navbar from './pages/navbar/Navbar';
import { USER_URL } from './config/api';
import SignupForm from './pages/SignUpForm';
import UserNavbar from './pages/navbar/UserNavbar';
import { getPatientsStatus, fetchPatients, selectAllPatients } from './redux/patient/patientSlice';

const App = () => {
const dispatch = useDispatch();

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [currentUser, setCurrentUser] = useState('');
const [searchResults, setSearchResults] = useState([]);
const patientsStatus = useSelector(getPatientsStatus);
const patients = useSelector(selectAllPatients);

useEffect(()=>{
  fetch(USER_URL).then((res) => {
    if(res.ok) {
      res.json().then((user) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
      })
    }
  })
}, [setCurrentUser]);

useEffect(() => {
  if (patientsStatus === 'idle') {
    dispatch(fetchPatients())
    .then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setSearchResults(patients);
      }
    })
  }
}, [patientsStatus]);


  if (!isAuthenticated) {
  return (
    <Routes>
      <Route path='/' element={<Login setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path='/signup' element={<SignupForm setCurrentUser={setCurrentUser}/>} />
  </Routes>
  )
} // admin panel
  if (currentUser?.admin) {
  return (
    <div className="App magic-pattern">
      <Navbar user={currentUser?.username} setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path='/' element={<AdminDashboard />} />
          <Route path='/patients' element={<PatientList  list={searchResults} userId={currentUser.id} />} />
          <Route path='/add-patient' element={<AddPatient/>} />
          <Route path='/stock' element={<Stock />} />
        </Routes>
  </div>
  )
  }
  //employee
   if (!currentUser?.admin) {
    return (
      <div className="App">
        <UserNavbar user={currentUser?.username} setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path='/' element={<PatientList list={searchResults} userId={currentUser.id}/>} />
          <Route path='/stock' element={<Stock />} />
        </Routes>
      </div>
    )
  }
};

export default App;


