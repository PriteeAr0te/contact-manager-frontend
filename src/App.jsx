import './assets/css/App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Layout from './Components/layout/Layout'
import CreateContact from './Pages/CreateContact'

const noLayoutRoutes = ["/login", "/register"];

function App() {
  const location = useLocation();
  const isNoRoute = noLayoutRoutes.includes(location.pathname);
  console.log(isNoRoute);

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
          <Route path='/' element={<Home />} />
          <Route path='/create-contact' element={<CreateContact />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
