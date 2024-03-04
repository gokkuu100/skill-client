import { useDispatch } from 'react-redux';
import { logout } from '../components/actions/authActions';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Perform any additional logout actions if needed
    dispatch(logout());
    // Redirect or perform any other actions after logout
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
