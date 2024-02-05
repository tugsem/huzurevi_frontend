import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LOGOUT_URL } from '../../config/api';

function HandleLogout({ setCurrentUser, setIsAuthenticated }) {
  const navigate = useNavigate();
  const deleteSession = () => {
    fetch(LOGOUT_URL, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          setCurrentUser('');
          setIsAuthenticated(false);
          navigate('/');
        }
      });
  };

  return (
    <button type="button" className="link" onClick={deleteSession}>Logout</button>
  );
}
export default HandleLogout;

HandleLogout.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};
