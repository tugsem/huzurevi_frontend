import React from 'react';
import propTypes from 'prop-types';
import { Tab, Tabs } from 'react-bootstrap';
import PatientForm from './PatientForm';
import PatientLogs from './PatientLogs';
import PatientNotes from './PatientNotes';

const PopupWindow = ({ id, name }) => (
  <div className="popup d-flex flex-column p-3">
    <div className="d-flex align-items-center justify-content-between">
      <h1>{name}</h1>
      <span>&#10006;</span>
    </div>
    <Tabs
      id="uncontrolled-tab-example"
      defaultActiveKEy="Veri Girişi"
      className="mb-3"
    >
      <Tab eventKey="Veri Girişi" title="Veri girişi">
        <PatientForm patientId={id} />
      </Tab>
      <Tab eventKey="logs" title="Kayıtlar">
        <PatientLogs patientId={id} />
      </Tab>
      <Tab eventKey="notes" title="Notlar">
        <PatientNotes patientId={id} />
      </Tab>
    </Tabs>
  </div>
);

export default PopupWindow;

PopupWindow.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};
