import './assets/css/App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Layout from './Components/layout/Layout'
import CreateContact from './Pages/CreateContact'
import PrivateRoute from './PrivateRoute'
import ContactDetails from './Pages/ContactDetails'
import Profile from './Pages/Profile'
import SharedContacts from './Pages/SharedContacts'

const noLayoutRoutes = ["/login", "/register"];

function App() {
  const location = useLocation();
  const isNoRoute = noLayoutRoutes.includes(location.pathname);
  

  return isNoRoute ? (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  ) : (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path='/create-contact' element={<CreateContact />} />
          <Route path='/contact/:id' element={<ContactDetails />} />
          <Route path='/myprofile' element={<Profile />} />
          <Route path='/shared-contacts' element={<SharedContacts />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
