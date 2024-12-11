import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const LoginRoute = ({ children }) => {
  const token = localStorage.getItem('useruid'); // Check if the user is authenticated

  // If user is authenticated, redirect them to the profile page
  if (token) {
    return <Navigate to="/profile" replace />;
  }

  // If not authenticated, render the requested component (children)
  return children;
};

export default LoginRoute;
