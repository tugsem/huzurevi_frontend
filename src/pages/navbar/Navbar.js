import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => (
  <>
    <nav className="navbar">
      <ul className="d-flex flex-column p-4">
        <li>
          <Link to="/">Hasta bakım formu</Link>
        </li>
        <li>
          <Link to="/add-patient">Hasta Kayıt</Link>
        </li>
        <li>
          <Link to="/stock">Stok Listesi</Link>
        </li>
      </ul>
    </nav>

    <Outlet />
  </>
);

export default Navbar;
