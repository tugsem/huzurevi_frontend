import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, Link } from 'react-router-dom';
import './navbar.scss';
import HandleLogout from '../Logout/HandleLogout';

const UserNavbar = ({ user, setCurrentUser, setIsAuthenticated }) => (
  <div className="d-flex">
    <nav className="navbar d-flex flex-column p-4">
      <h2>
        Welcome,
        {user}
        !
      </h2>
      <ul>
        <li>
          <Link to="/">Hasta bakım formu</Link>
        </li>
        <li>
          <Link to="/stock">Stok Listesi</Link>
        </li>
        <li>
          <HandleLogout setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} />
        </li>
      </ul>
    </nav>

    <Outlet />
  </div>
);

export default UserNavbar;

UserNavbar.propTypes = {
  user: PropTypes.string.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};
