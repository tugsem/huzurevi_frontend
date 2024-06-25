import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Outlet, Link } from 'react-router-dom';
import './userNavbar.scss';
import './acordionMenu.scss';
import HandleLogout from '../Logout/HandleLogout';
import capitalizeWords from '../../modules/capitalizeWords';

const UserNavbar = ({ user, setCurrentUser, setIsAuthenticated }) => {
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
        <h6 className="user px-4">
          {capitalizeWords(user) || ''}
        </h6>
        <div className={hidden ? 'navTrigger pointer' : 'navTrigger pointer active'} onClick={handleMenu} role="button" tabIndex={0} onKeyDown={handleMenu}>
          <i />
          <i />
          <i />
        </div>
        <ul className={hidden ? 'slip-menu' : 'slip-menu show'}>
          <li>
            <Link to="/" onClick={handleLinkClick}>Patients</Link>
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
export default UserNavbar;

UserNavbar.propTypes = {
  user: PropTypes.string.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};
