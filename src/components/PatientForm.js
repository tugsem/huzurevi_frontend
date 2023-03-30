import React from 'react';
import { Form, Button } from 'react-bootstrap';

const PatientForm = () => (
  <div>
    <Form className="d-flex flex-column stock-form">
      <Form.Group required>
        <Form.Label>İlaç </Form.Label>
        <Form.Control type="text" placeholder="Ürün ismi" defaultValue="" />
      </Form.Group>
      <Form.Group required>
        <Form.Label>Miktar</Form.Label>
        <Form.Control type="text" placeholder="Miktar" defaultValue="" />
      </Form.Group>
      <Button variant="info" type="submit" className="mt-3">
        Kaydet
      </Button>
    </Form>
  </div>
);

export default PatientForm;
