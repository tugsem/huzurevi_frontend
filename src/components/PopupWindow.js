import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Tab, Tabs } from 'react-bootstrap';
import { PATIENT_URL } from '../config/api';
import PatientForm from './PatientForm';
import PatientLogs from './PatientLogs';
import PatientNotes from './PatientNotes';

const PopupWindow = ({
  name, id, closePopup, userId,
}) => {
  const MEDICAL_RECORD_URL = `${PATIENT_URL}/${id}/medication_records`;
  const [medicalRecords, setMedicalRecords] = useState([]);

  const getPatientLogs = async () => {
    const response = await axios.get(MEDICAL_RECORD_URL);
    return response.data;
  };

  useEffect(() => {
    const loadMedicationRecords = async () => {
      const medicationRecords = await getPatientLogs();
      setMedicalRecords(() => medicationRecords);
    };
    loadMedicationRecords();
  }, [setMedicalRecords]);

  return (
    <div className="popup d-flex flex-column p-3 h-100 overflow-scroll">
      <div className="d-flex align-items-center justify-content-between">
        <h1>{name}</h1>
        <span className="pointer" onClick={closePopup} onKeyDown={closePopup} role="presentation">&#10006;</span>
      </div>
      <Tabs
        id="uncontrolled-tab-example"
        defaultactivekey="data-entry"
        className="mb-3"
      >
        <Tab eventKey="data-entry" title="Record data">
          <PatientForm
            patientName={name}
            patientId={id}
            userId={userId}
            logs={medicalRecords}
            setMedicalRecords={setMedicalRecords}
          />
        </Tab>
        <Tab eventKey="logs" title="Recents">
          <PatientLogs userId={userId} logs={medicalRecords} />
        </Tab>
        <Tab eventKey="notes" title="Notes">
          <PatientNotes patientName={name} patientId={id} userId={userId} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PopupWindow;

PopupWindow.propTypes = {
  userId: propTypes.number.isRequired,
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  closePopup: propTypes.func.isRequired,
};
