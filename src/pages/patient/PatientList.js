import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import Patient from '../../components/Patient';
import PopupWindow from '../../components/PopupWindow';
import './patients.scss';
import {
  selectAllPatients, getPatientsStatus, getPatientsError,
} from '../../redux/patient/patientSlice';

const PatientList = ({ userId }) => {
  const patients = useSelector(selectAllPatients);
  const patientsStatus = useSelector(getPatientsStatus);
  const error = useSelector(getPatientsError);

  const [searchResults, setSearchResults] = useState(patients);
  const [searched, setSearched] = useState(false);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [content, setContent] = useState(null);

  const handlePatient = (e) => {
    const textValue = e.target.innerText;
    setName(textValue);
    setPopupVisibility((prevState) => !prevState);
    const patientId = e.target.parentNode.id;
    setId(patientId);
  };

  const handleClose = () => {
    setPopupVisibility(false);
  };

  const handleSearch = (e) => {
    const lowerCased = e.target.value.toLowerCase();
    if (e.target.value !== '') {
      setSearched((prevState) => !prevState);
      const filtered = patients.filter((patient) => (patient.first_name + patient.last_name).toLowerCase().includes(lowerCased)); /* eslint-disable-line */
      setSearchResults(filtered);
    } else {
      setSearchResults(patients);
    }
  };
  // Change empty state to action payload after promise fullfilled
  useEffect(() => {
    setSearchResults(() => patients);
  }, [patientsStatus]);

  // change the content of the page according to the popup, search results
  useEffect(() => {
    if (patientsStatus === 'loading') {
      setContent(<h2>Loading ...</h2>);
    } else if (patientsStatus === 'succeeded') {
      setContent(() => (
        <div className="patient-container d-flex flex-column align-items-center">
          {popupVisibility
          && (
          <PopupWindow
            name={name}
            id={Number(id)}
            userId={userId}
            closePopup={handleClose}
          />
          )}
          <form className="patient-search-box w-100 d-flex justify-content-center">
            <input className="search-field p-2 my-3" type="search" placeholder="Hasta ara" aria-label="Search" onChange={handleSearch} />
          </form>
          <ul className="patient-list">
            {searchResults?.map((patient) => (
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
      ));
    } else {
      setContent((prevState) => (error ? <Alert variant="danger">{error}</Alert> : prevState));
    }
  }, [patientsStatus, searchResults, popupVisibility, searched]);
  return content;
};

export default PatientList;
