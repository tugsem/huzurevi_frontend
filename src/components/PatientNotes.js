import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import propTypes from 'prop-types';
import { PATIENT_URL } from '../config/api';

const PatientNotes = ({ patientId, patientName, userId }) => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    note: '',
    patient_id: '',
    nurse_id: '',
  });

  const sendFormData = async () => {
    try {
      console.log(formData);
      const response = await axios.post(`${PATIENT_URL}/${patientId}/notes`, formData);
      return response.data;
    } catch (e) {
      return e;
    }
  };

  const handleNote = (e) => {
    e.preventDefault();
    setFormData(() => ({
      note: e.target.firstChild.value,
      patient_id: patientId,
      nurse_id: userId,
    }));
    sendFormData();
    e.target.firstChild.value = '';
  };

  useEffect(() => {
    const loadNotes = async () => {
      const response = await axios.get(`${PATIENT_URL}/${patientId}/notes`);
      setNotes(() => response.data);
    };
    loadNotes();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-between note-container">
      <ul className="patient-notes d-flex flex-column">
        {notes.map((note) => (
          <li key={note.index} className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center gap-5">
              <span className="smallest-font">{patientName}</span>
              <span className="smallest-font align-self-end">{note.date}</span>
            </div>
            <span>{note.note}</span>
          </li>
        ))}
      </ul>
      <form className="d-flex justify-content-between note-form w-100" onSubmit={handleNote}>
        <input className="w-100" type="text" placeholder="Notu giriniz" />
        <Button variant="info" type="submit">Kaydet</Button>
      </form>
    </div>
  );
};
export default PatientNotes;

PatientNotes.propTypes = {
  patientId: propTypes.number.isRequired,
  patientName: propTypes.string.isRequired,
  userId: propTypes.number.isRequired,
};
