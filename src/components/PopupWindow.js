import React from 'react';
import propTypes from 'prop-types';
import { Tab, Tabs } from 'react-bootstrap';
import PatientForm from './PatientForm';
import PatientLogs from './PatientLogs';
import PatientNotes from './PatientNotes';

const PopupWindow = ({ name, closePopup }) => (
  <div className="popup d-flex flex-column p-3">
    <div className="d-flex align-items-center justify-content-between">
      <h1>{name}</h1>
      <span className="pointer" onClick={closePopup} onKeyDown={closePopup} role="presentation">&#10006;</span>
    </div>
    <Tabs
      id="uncontrolled-tab-example"
      defaultactivekey="Veri Girişi"
      className="mb-3"
    >
      <Tab eventKey="Veri Girişi" title="Veri girişi">
        <PatientForm patientName={name} />
      </Tab>
      <Tab eventKey="logs" title="Kayıtlar">
        <PatientLogs patientName={name} />
      </Tab>
      <Tab eventKey="notes" title="Notlar">
        <PatientNotes patientName={name} />
      </Tab>
    </Tabs>
  </div>
);

export default PopupWindow;

PopupWindow.propTypes = {
  // id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  closePopup: propTypes.func.isRequired,
};
