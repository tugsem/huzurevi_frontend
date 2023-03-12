import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PatientForm = () => (
  <div className="patientForm m-5 w-50">
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Patient Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Button variant="info" type="submit">
        Submit
      </Button>
    </Form>
  </div>

);

export default PatientForm;
