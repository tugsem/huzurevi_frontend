import React from 'react';
import propTypes from 'prop-types';
import { Tab, Tabs } from 'react-bootstrap';
import PatientForm from './PatientForm';
import PatientLogs from './PatientLogs';
import PatientNotes from './PatientNotes';

const PopupWindow = ({
  name, id, closePopup, userId,
}) => (
  <div className="popup d-flex flex-column p-3">
    <div className="d-flex align-items-center justify-content-between">
      <h1>{name}</h1>
      <span className="pointer" onClick={closePopup} onKeyDown={closePopup} role="presentation">&#10006;</span>
    </div>
    <Tabs
      id="uncontrolled-tab-example"
      defaultactivekey="data-entry"
      className="mb-3"
    >
      <Tab eventKey="data-entry" title="Record data">
        <PatientForm patientName={name} patientId={id} userId={userId} />
      </Tab>
      <Tab eventKey="logs" title="Recents">
        <PatientLogs patientName={name} patientId={id} />
      </Tab>
      <Tab eventKey="notes" title="Notes">
        <PatientNotes patientName={name} patientId={id} />
      </Tab>
    </Tabs>
  </div>
);

export default PopupWindow;

PopupWindow.propTypes = {
  userId: propTypes.number.isRequired,
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  closePopup: propTypes.func.isRequired,
};
