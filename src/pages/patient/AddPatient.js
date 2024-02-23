import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { addPatient, getPatientsError } from '../../redux/patient/patientSlice';

const AddPatient = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const error = useSelector(getPatientsError);
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '1',
    contact_number: '',
    email: '',
    address: '',
    status: '1',
    room_number: 0,
    medications: '',
    medical_history: '',
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
    dispatch(addPatient(formData))
      .then((response) => {
        if (response.ok) {
          setSuccess((prevState) => !prevState);
        }
      });
  };
  return (
    <Form onSubmit={handleSubmit} className="desktop-container ">
      { (error) && (
        <Alert variant="danger">{error}</Alert>
      )}
      { (success) && (
        <Alert variant="success">The patient created.</Alert>
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
        <Form.Label>Gender:</Form.Label>
        <Form.Select aria-label="1" onChange={handleChange} name="gender">
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Non-binary</option>
        </Form.Select>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" name="email" onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label className="text-nowrap">Adress:</Form.Label>
        <Form.Control type="text" name="address" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="d-flex align-items-center gap-3 py-4">
        <Form.Label className="text-nowrap">Contact number:</Form.Label>
        <PhoneInput
          defaultCountry="TR"
          value={value}
          onChange={setValue}
        />
        <Form.Label className="text-nowrap">Room: </Form.Label>
        <Form.Control type="number" name="room_number" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="d-flex align-items-center gap-3 py-4">
        <Form.Label>Status:</Form.Label>
        <Form.Select aria-label="1" onChange={handleChange} name="status">
          <option value="1">Active</option>
          <option value="2">Discharged</option>
          <option value="3">On leave</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="py-4">
        <Form.Label>Medications:</Form.Label>
        <Form.Control type="text" name="medications" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Medical History:</Form.Label>
        <Form.Control type="text" name="medical_history" />
      </Form.Group>
      <Button variant="info" type="submit" className="mt-4">Submit</Button>
    </Form>
  );
};

export default AddPatient;
