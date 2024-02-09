import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Patient from '../../components/Patient';
import PopupWindow from '../../components/PopupWindow';
import './patients.scss';
import {
  selectAllPatients, getPatientsStatus, fetchPatients,
} from '../../redux/patient/patientSlice';

const PatientList = () => {
  const dispatch = useDispatch();
  const patients = useSelector(selectAllPatients);
  const patientsStatus = useSelector(getPatientsStatus);

  const [search, setSearch] = useState('');
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [name, setName] = useState(null);

  useEffect(() => {
    if (patientsStatus === 'idle') {
      dispatch(fetchPatients());
    }
  }, [patientsStatus, dispatch]);

  const [searchResults, setSearchResults] = useState(patients);

  const handlePatient = (e) => {
    const textValue = e.target.innerText;
    setName(textValue);
    setPopupVisibility(true);
  };

  const handleClose = () => {
    setPopupVisibility(false);
  };

  useEffect(() => {
    if (search === '') {
      setSearchResults(patients);
    } else {
      const lowerCased = search.toLowerCase();
      const filtered = patients.filter((patient) => patient.name.toLowerCase().includes(lowerCased)); /* eslint-disable-line */
      setSearchResults(filtered);
    }
  }, [search]);

  let content;
  if (patientsStatus === 'loading') {
    content = <h2>Loading ...</h2>;
  } else if (patientsStatus === 'succeeded') {
    content = (
      <div className="patient-container d-flex flex-column align-items-center">
        {popupVisibility && <PopupWindow name={name} closePopup={handleClose} />}
        <form className="patient-search-box w-100 d-flex justify-content-center">
          <input className="search-field p-2 my-3" type="search" placeholder="Hasta ara" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
        </form>
        <ul className="patient-list">
          {searchResults.map((patient) => (
            <li key={patient.id}>
              <Patient
                id={patient.id}
                name={`${patient.first_name} ${patient.last_name}`}
                img="https://cdn-icons-png.flaticon.com/512/1430/1430453.png"
                openPopup={handlePatient}
              />
            </li>
          ))}
        </ul>

      </div>
    );
  } else {
    content = <h2>Oops..There is an error.</h2>;
  }
  return content; //
};

export default PatientList;
