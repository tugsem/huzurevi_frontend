import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './navbar.scss';
import handleLogout from '../Logout/Logout';

const Navbar = ({ setCurrentUser }) => (
  <>
    <nav className="navbar">
      <ul className="d-flex flex-column p-4">
        <li>
          <Link to="/patients">Hasta bakım formu</Link>
        </li>
        <li>
          <Link to="/add-patient">Hasta Kayıt</Link>
        </li>
        <li>
          <Link to="/stock">Stok Listesi</Link>
        </li>
        <li>
          <a href="/" onClick={() => handleLogout(setCurrentUser)}>Logout</a>
        </li>
      </ul>
    </nav>

    <Outlet />
  </>
);

export default Navbar;
