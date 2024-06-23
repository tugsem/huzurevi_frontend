import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, Link } from 'react-router-dom';
import './navbar.scss';
import './acordionMenu.scss';
import HandleLogout from '../Logout/HandleLogout';

const UserNavbar = ({ user, setCurrentUser, setIsAuthenticated }) => (
  <div>
    <nav className="navbar">
      <h5 className="user">
        Welcome,
        {user}
        !
      </h5>
      <div className="navTrigger pointer">
        <i />
        <i />
        <i />
      </div>
      <ul className="slip-menu">
        <li>
          <Link to="/">Patients</Link>
        </li>
        <li>
          <Link to="/stock">Stock</Link>
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
