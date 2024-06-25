import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet, Link } from 'react-router-dom';
import './adminNavbar.scss';
import './acordionMenu.scss';
import HandleLogout from '../Logout/HandleLogout';

const AdminNavbar = ({ setCurrentUser, setIsAuthenticated }) => {
  const [hidden, setHidden] = useState(true);

  const body = document.querySelector('body');

  useEffect(() => {
    if (hidden) {
      body.style.overflow = 'auto';
    } else {
      body.style.overflow = 'hidden';
    }
  }, [setHidden]);

  const handleMenu = () => {
    setHidden((prevState) => !prevState);
  };

  const handleLinkClick = () => {
    setHidden((prevState) => !prevState);
  };

  return (
    <div>
      <nav className="navbar d-flex">
        <Link to="/" className="logo">
          <img alt="logo" src="./logo.png" className="logoImage" />
        </Link>
        <div className={hidden ? 'navTrigger pointer' : 'navTrigger pointer active'} onClick={handleMenu} role="button" tabIndex={0} onKeyDown={handleMenu}>
          <i />
          <i />
          <i />
        </div>
        <ul className={hidden ? 'slip-menu' : 'slip-menu show'}>
          <li>
            <Link to="/" className="link" onClick={handleLinkClick}>Dashboard</Link>
          </li>
          <li>
            <Link to="/patients" className="link" onClick={handleLinkClick}>Patients</Link>
          </li>
          <li>
            <Link to="/add-patient" className="link" onClick={handleLinkClick}>New Patient</Link>
          </li>
          <li>
            <Link to="/stock" className="link" onClick={handleLinkClick}>Stock</Link>
          </li>
          <li>
            <HandleLogout setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} />
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default AdminNavbar;

AdminNavbar.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};
