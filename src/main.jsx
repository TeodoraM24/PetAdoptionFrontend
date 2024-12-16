import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Home from './pages/Home.jsx'
import Adoption from './pages/Adoption.jsx'
import MainLayout from './layout/MainLayout.jsx'
import About from './pages/About.jsx'
import Appointment from './pages/Appointment.jsx'
import Dogs from './pages/Dogs.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='adoption' element={<Adoption />} />
      <Route path='appointment' element={<Appointment />} />
      <Route path='dogs' element={<Dogs />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)