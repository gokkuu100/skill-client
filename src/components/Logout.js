import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../components/actions/authActions';
import { faCircleStop, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Perform any additional logout actions if needed
    dispatch(logout());
    // Redirect or perform any other actions after logout
  };

  return (
    <button onClick={handleLogout}><FontAwesomeIcon icon={faCircleXmark} /> Logout</button>
  );
};

export default Logout;
