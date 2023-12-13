import { LOGOUT_URL } from '../../config/api';

const handleLogout = (setState) => {
  fetch(LOGOUT_URL, { method: 'DELETE' })
    .then((res) => {
      if (res.ok) {
        setState(null);
      }
    });
};
export default handleLogout;
