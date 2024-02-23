import React from 'react';
import propTypes from 'prop-types';

const Patient = ({
  id, img, name, openPopup,
}) => (
  <div className="patient d-flex" id={id}>
    <img alt="patient" className="patient-picture" src={img} loading="lazy" />
    <h6 className="patient-name pointer" onClick={openPopup} onKeyDown={openPopup} role="presentation">{name}</h6>
  </div>
);

export default Patient;

Patient.propTypes = {
  id: propTypes.number.isRequired,
  img: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  openPopup: propTypes.func.isRequired,
};
