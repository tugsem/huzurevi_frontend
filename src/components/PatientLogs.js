import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import propTypes from 'prop-types';
import { PATIENT_URL } from '../config/api';

const PatientLogs = ({ patientId, userId }) => {
  const MEDICAL_RECORD_URL = `${PATIENT_URL}/${patientId}/medication_records`;
  const [records, setRecords] = useState([]);

  const getPatientLogs = async () => {
    const response = await axios.get(MEDICAL_RECORD_URL);
    return response.data;
  };

  useEffect(() => {
    const loadMedicationRecords = async () => {
      const medicationRecords = await getPatientLogs();
      setRecords(medicationRecords);
    };
    loadMedicationRecords();
  }, []);

  return (
    <Table className="table-fixed" striped hover bordered>
      <thead>
        <tr>
          <th>ID</th>
          <th>Medication</th>
          <th>Dose(mg)</th>
          <th>Date</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        {records.map((rec) => (
          <tr key={rec.id}>
            <td>{rec.id}</td>
            <td>{rec.medication_name}</td>
            <td>{rec.dosage}</td>
            <td>{new Date(rec.administration_time).toLocaleString()}</td>
            {(rec.nurse_id === userId) && (
              <td>Remove</td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PatientLogs;

PatientLogs.propTypes = {
  patientId: propTypes.number.isRequired,
  userId: propTypes.number.isRequired,
};
