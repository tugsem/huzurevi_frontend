import React from 'react';
import { Button } from 'react-bootstrap';

const notes = [
  {
    id: 1,
    note: 'Lorem ipsum',
    from: 'test',
    date: '30/03/2023/12:39',
  },
  {
    id: 2,
    note: 'Lorem ipsum',
    from: 'test',
    date: '30/03/2023/12:39',
  },
  {
    id: 3,
    note: 'Lorem ipsum dolor sit amet',
    from: 'test',
    date: '30/03/2023/12:39',
  },
  {
    id: 4,
    note: 'Lorem ipsum',
    from: 'test',
    date: '30/03/2023/12:39',
  },
];
const PatientNotes = () => (
  <div className="d-flex flex-column justify-content-between note-container">
    <ul className="patient-notes d-flex flex-column">
      {notes.map((note) => (
        <li key={note.id} className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center gap-5">
            <span className="smallest-font">{note.from}</span>
            <span className="smallest-font align-self-end">{note.date}</span>
          </div>
          <span>{note.note}</span>
        </li>
      ))}
    </ul>
    <form className="d-flex justify-content-between note-form w-100">
      <input className="w-100" type="text" placeholder="Notu giriniz" />
      <Button variant="info" type="submit">Kaydet</Button>
    </form>
  </div>
);

export default PatientNotes;
