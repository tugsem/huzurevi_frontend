import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Home = () => (
  <Form className="m-5 w-50">
    <Form.Select id="dropdown-patient-list" title="patient name">
      {/* {patients.map((patient )=> {
              return (<option key={patient.id}>{patient.name}</option>)
            })} */}
    </Form.Select>
    <Form.Group>
      <Form.Label>Note about patient</Form.Label>
      <Form.Control type="text" />
    </Form.Group>
    <Button variant="info" type="submit">
      Submit
    </Button>
  </Form>
);

export default Home;
