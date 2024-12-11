// import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('useruid'); // Check if the user is authenticated
  // const navigate = useNavigate(); // Initialize navigate hook

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/signin" />;
  }

  // If token exists, render the requested component
  return children;
};

export default PrivateRoute;
