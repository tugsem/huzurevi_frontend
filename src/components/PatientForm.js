import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(MEDICAL_RECORD_URL, { ...formData });
    console.log(response.data);
  };
  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value.trim(),
    }));
  };
  return (
    <Form className="d-flex flex-column stock-form" onSubmit={handleSubmit}>
      <Form.Group required>
        <Form.Label>Medicine</Form.Label>
        <Form.Control type="text" name="medication_name" placeholder="the name of the medicine" onChange={handleChange} />
      </Form.Group>
      <Form.Group required>
        <Form.Label>Dosage</Form.Label>
        <Form.Control type="text" name="dosage" placeholder="the dosage" onChange={handleChange} />
      </Form.Group>
      <Form.Group required>
        <Form.Label>Note</Form.Label>
        <Form.Control type="text" name="note" placeholder="anything to know" onChange={handleChange} />
      </Form.Group>
      <Form.Group required>
        <Form.Label>Administration time:</Form.Label>
        <Form.Control type="time" name="administration_time" placeholder="time" onChange={handleChange} />
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
