import React from 'react';
import { Table } from 'react-bootstrap';
import propTypes from 'prop-types';

const PatientLogs = ({ userId, logs }) => (
  <Table className="table-responsive" striped hover style={{ height: 'inherit', overflow: 'scroll' }}>
    <thead>
      <tr>
        <th>Medication</th>
        <th>Dose(mg)</th>
        <th>Date</th>
        <th>#</th>
      </tr>
    </thead>
    <tbody>
      {logs.map((rec) => (
        <tr key={rec.id}>
          <td>{rec.medication_name}</td>
          <td>{rec.dosage}</td>
          <td>{new Date(rec.administration_time).toLocaleString()}</td>
          {(rec.nurse_id === userId) && (
          <td>Remove</td>
          )}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default PatientLogs;

PatientLogs.propTypes = {
  userId: propTypes.number.isRequired,
  logs: propTypes.arrayOf(propTypes.objectOf(propTypes.any)).isRequired,
};
