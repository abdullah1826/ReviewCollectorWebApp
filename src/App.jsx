
// import './App.css'
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router-dom'
import Signin from './Authentication/Signin'
import Signup from './Authentication/Signup'
import ForgotPassword from './Authentication/ForgotPassword'
import Profile from './Pages/Profile'
import Dashboard from './Pages/Dashboard'
import Setting from './Pages/Setting'
import Survey from './Pages/Survey'
import ManageProfile from './Pages/ManageProfile'

function App() {
   const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/profile" replace />
    },
    {
      path: '/signup',
      element:
      <div>
        <Signup/>
      </div>
    },
    {
      path: '/signin',
      element:
      <div>
        <Signin/>
      </div>
    },
    {
      path: '/forgotPassword',
      element:
      <div>
        <ForgotPassword/>
      </div>
    },
    {
      path: '/profile',
      element:
      <div>
        <Profile/>
      </div>
    },
    {
      path: '/dashboard',
      element:
      <div>
        <Dashboard/>
      </div>
    },
    {
      path: '/setting',
      element:
      <div>
        <Setting/>
      </div>
    },
    {
      path: '/survey',
      element:
      <div>
        <Survey/>
      </div>
    },
    {
      path: '/manageProfile',
      element:
      <div>
        <ManageProfile/>
      </div>
    },
   ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
