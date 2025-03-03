import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Signin from './Authentication/Signin';
import Signup from './Authentication/Signup';
import ForgotPassword from './Authentication/ForgotPassword';
import Profile from './Pages/Profile';
import Dashboard from './Pages/Dashboard';
import Setting from './Pages/Setting';
import Survey from './Pages/Survey';
import ManageProfile from './Pages/ManageProfile';
import AboutApp from './Pages/AboutApp';
import PrivateRoute from './components/PrivateRoute';
import LoginRoute from './components/LoginRoute';
import PrivacyPolicy from './Pages/PrivacyPolicy';

function App() {
  const [user, setUser] = useState(null); 
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
    });

    return () => unsubscribe(); 
  }, [auth]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? <Navigate to="/profile" replace /> : <Navigate to="/signin" replace />,
    },
    {
      path: '/signup',
      element: (
        <LoginRoute user={user}>
          <Signup />
        </LoginRoute>
      ),
    },
    {
      path: '/signin',
      element: (
        <LoginRoute user={user}>
          <Signin />
        </LoginRoute>
      ),
    },
    {
      path: '/forgotPassword',
      element: <ForgotPassword />,
    },
    {
      path: '/profile',
      element: (
        <PrivateRoute user={user}>
          <Profile />
        </PrivateRoute>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <PrivateRoute user={user}>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: '/setting',
      element: (
        <PrivateRoute user={user}>
          <Setting />
        </PrivateRoute>
      ),
    },
    {
      path: '/survey',
      element: (
        <PrivateRoute user={user}>
          <Survey />
        </PrivateRoute>
      ),
    },
    {
      path: '/manageProfile',
      element: (
        <PrivateRoute user={user}>
          <ManageProfile />
        </PrivateRoute>
      ),
    },
    {
      path: '/aboutApp',
      element: (
        <PrivateRoute user={user}>
          <AboutApp />
        </PrivateRoute>
      ),
    },
    {
      path: '/privacyPolicy',
      element: (
        <PrivateRoute user={user}>
          <PrivacyPolicy />
        </PrivateRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
