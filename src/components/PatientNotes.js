import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import propTypes from 'prop-types';
import { PATIENT_URL } from '../config/api';

const PatientNotes = ({ patientId, userId }) => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    note: '',
    user_id: '',
  });
  const [alert, setAlert] = useState(null);

  const sendFormData = async () => {
    try {
      const response = await axios.post(`${PATIENT_URL}/${patientId}/notes`, formData);
      return response.data;
    } catch (e) {
      setAlert(() => e.response.data.message.note[0]);
      setTimeout(() => {
        setAlert(() => null);
      }, 3000);
      return e;
    }
  };

  const handleChange = (e) => {
    setFormData(() => ({
      note: e.target.value,
      user_id: userId,
    }));
  };

  const submitFormData = (e) => {
    e.preventDefault();
    sendFormData();
    e.target.firstChild.value = '';
  };

  useEffect(() => {
    const loadNotes = async () => {
      const response = await axios.get(`${PATIENT_URL}/${patientId}/notes`);
      const data = await response.data;
      setNotes(() => data);
    };
    loadNotes();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-between note-container">
      { alert && (
        <Alert variant="danger">{alert}</Alert>
      )}
      <ul className="patient-notes d-flex flex-column">
        {notes?.map((note) => (
          <li key={note.id} className={`d-flex flex-column ${note.user_id === userId ? 'align-self-end' : ''}`}>
            <div className="d-flex justify-content-between align-items-center gap-5">
              <span className="smallest-font">
                by #
                {note.user_id}
              </span>
              <span className="smallest-font align-self-end">{note.date}</span>
            </div>
            <span>{note.note}</span>
          </li>
        ))}
      </ul>
      <form className="d-flex justify-content-between note-form w-100" action="/patients" onSubmit={submitFormData}>
        <input type="text" placeholder="Notu giriniz" name="note" onChange={handleChange} />
        <Button variant="info" type="submit">Kaydet</Button>
      </form>
    </div>
  );
};
export default PatientNotes;

PatientNotes.propTypes = {
  patientId: propTypes.number.isRequired,
  userId: propTypes.number.isRequired,
};
