import React, { useState, useEffect } from 'react';
import Patient from '../../components/Patient';
import PopupWindow from '../../components/PopupWindow';
import './patients.scss';

const patients = [
  {
    id: 1,
    name: 'Lorem Ipsum',
    picture: 'https://cdn-icons-png.flaticon.com/512/1430/1430453.png',
  },
  {
    id: 2,
    name: 'Knut hamsun',
    picture: 'https://cdn-icons-png.flaticon.com/512/1430/1430453.png',
  },
  {
    id: 3,
    name: 'Faye Dunaway',
    picture: 'https://cdn-icons-png.flaticon.com/512/1430/1430453.png',
  },
  {
    id: 4,
    name: 'Dostoyevski',
    picture: 'https://cdn-icons-png.flaticon.com/512/1430/1430453.png',
  },
  {
    id: 5,
    name: 'Donatella',
    picture: 'https://cdn-icons-png.flaticon.com/512/1430/1430453.png',
  },
];

const PatientList = () => {
  const [searchResults, setSearchResults] = useState(patients);
  const [search, setSearch] = useState('');
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);

  const handlePatient = (e) => {
    setId(e.target.key);
    setName(e.target.children[1].innerText);
    setPopupVisibility(true);
  };

  useEffect(() => {
    if (search === '') {
      setSearchResults(patients);
    } else {
      const lowerCased = search.toLowerCase();
      const filtered = patients.filter((patient) => patient.name.toLowerCase().includes(lowerCased)); /* eslint-disable-line */
      setSearchResults(filtered);
    }
  }, [search]);

  return (
    <div className="patient-container d-flex flex-column align-items-center pt-4">
      {popupVisibility && <PopupWindow id={id} name={name} />}
      <form className="patient-search-box w-100 d-flex justify-content-center">
        <input className="search-field p-2 my-3" type="search" placeholder="Hasta ara" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
      </form>
      <ul className="patient-list">
        {searchResults.map((patient) => (
          <li key={patient.id} onClick={handlePatient} onKeyDown={handlePatient} role="presentation">
            <Patient id={patient.id} name={patient.name} img={patient.picture} />
          </li>
        ))}
      </ul>

    </div>
  );
};

export default PatientList;
