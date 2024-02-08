import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const AddPatient = () => {
  const [error, setError] = useState(null);
  const [value, setValue] = useState();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '1',
    contact_number: '',
    email: '',
    admission_date: '',
    status: '1',
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      contact_number: value,
    }));
  }, [value]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value.trim(),
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch action and add new patient to redux store if the patient is valid
    // in case of errors set error message
    // if the status.ok show a notification and show a button to navigate to the patient page
  };
  return (
    <Form onSubmit={handleSubmit} className="desktop-container ">
      { (error) && (
        <Alert variant="danger">{error}</Alert>
      )}
      <h1>Patient Record</h1>
      <Form.Group className="d-flex align-items-center gap-3 py-4">
        <Form.Label className="text-nowrap">First name:</Form.Label>
        <Form.Control type="text" name="first_name" onChange={handleChange} />
        <Form.Label className="text-nowrap">Last name:</Form.Label>
        <Form.Control type="text" name="last_name" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="d-flex align-items-center gap-3">
        <Form.Label className="text-nowrap">Date of birth:</Form.Label>
        <Form.Control type="date" name="date_of_birth" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="d-flex align-items-center gap-3 py-4">
        <Form.Label>Gender</Form.Label>
        <Form.Select aria-label="1" onChange={handleChange} name="gender">
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Non-binary</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="d-flex align-items-center gap-3">
        <Form.Label>Contact number:</Form.Label>
        <PhoneInput
          defaultCountry="TR"
          value={value}
          onChange={setValue}
        />
      </Form.Group>
      <Form.Group className="d-flex align-items-center gap-3 py-4">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" name="email" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="d-flex align-items-center gap-3">
        <Form.Label className="text-nowrap">Admission date:</Form.Label>
        <Form.Control type="date" name="admission_date" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="d-flex align-items-center gap-3 py-4">
        <Form.Label>Status</Form.Label>
        <Form.Select aria-label="1" onChange={handleChange} name="status">
          <option value="1">Active</option>
          <option value="2">Discharged</option>
          <option value="3">On leave</option>
        </Form.Select>
      </Form.Group>
      <Button variant="info" type="submit">Submit</Button>
    </Form>
  );
};

export default AddPatient;
