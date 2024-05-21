import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { PATIENT_URL } from '../config/api';

const PatientForm = ({ patientId, userId }) => {
  const MEDICAL_RECORD_URL = `${PATIENT_URL}/${patientId}/medication_records`;
  const [formData, setFormData] = useState({
    medication_name: '',
    dosage: '',
    note: '',
    patient_id: patientId,
    nurse_id: userId,
    administration_time: '',
  });
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setAlert(() => false);
    }, 2000);
    return () => clearTimeout(timerId); // Clean up the timer on component unmount or alert change
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(MEDICAL_RECORD_URL, { ...formData });
      if (response.status === 201) {
        setAlert((prevState) => !prevState);
        setMessage('Saved successfully');
      }
    } catch (error) {
      setAlert((prevState) => !prevState);
      setMessage(error.message);
    }
  };
  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value.trim(),
    }));
  };
  return (
    <Form className="d-flex flex-column stock-form" onSubmit={handleSubmit}>
      {alert && (
        <Alert variant="info">{message}</Alert>
      )}
      <Form.Group required>
        <Form.Label>Medicine</Form.Label>
        <Form.Control type="text" name="medication_name" placeholder="the name of the medicine" onChange={handleChange} required />
      </Form.Group>
      <Form.Group required>
        <Form.Label>Dosage(mg)</Form.Label>
        <Form.Control type="number" name="dosage" placeholder="the dosage" onChange={handleChange} required min="0" />
      </Form.Group>
      <Form.Group required>
        <Form.Label>Administration time:</Form.Label>
        <Form.Control type="time" name="administration_time" placeholder="time" onChange={handleChange} required />
      </Form.Group>
      <Button variant="info" type="submit" className="mt-3">
        Save
      </Button>
    </Form>
  );
};

export default PatientForm;

PatientForm.propTypes = {
  userId: propTypes.number.isRequired,
  patientId: propTypes.number.isRequired,
};
