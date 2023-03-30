import React from 'react';
import { Button } from 'react-bootstrap';

const notes = [
  {
    note: 'Lorem ipsum',
  },
  {
    note: 'Lorem ipsum',
  },
  {
    note: 'Lorem ipsum dolor sit amet',
  },
  {
    note: 'Lorem ipsum',
  },
  {
    note: 'Lorem ipsum',
  },
];
const PatientNotes = () => (
  <div className="d-flex flex-column justify-content-between note-container">
    <ul className="patient-notes d-flex flex-column">
      {notes.map((note) => (
        <li key={note.id}>{note.note}</li>
      ))}
    </ul>
    <form className="d-flex justify-content-between note-form">
      <input className="w-100" type="text" placeholder="Notu giriniz" />
      <Button variant="info" type="submit">Kaydet</Button>
    </form>
  </div>
);

export default PatientNotes;
