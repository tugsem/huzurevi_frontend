import React from 'react';
import propTypes from 'prop-types';

const Patient = ({ img, name }) => (
  <div className="patient d-flex">
    <img alt="patient" className="patient-picture" src={img} />
    <h6 className="patient-name">{name}</h6>
  </div>
);

export default Patient;

Patient.propTypes = {
  img: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};
