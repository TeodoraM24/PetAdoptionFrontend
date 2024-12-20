// src/index.js

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'; // Import from 'react-router'
import Home from './pages/Home.jsx';
import Adoption from './pages/Adoption.jsx';
import MainLayout from './layout/MainLayout.jsx';
import About from './pages/About.jsx';
import Appointment from './pages/Appointment.jsx';
import Dogs from './pages/Dogs.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dog from './pages/Dog.jsx';
import AdminAppointment from './pages/AdminAppointment.jsx';


// Define your routes with the createBrowserRouter
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="adoption" element={<Adoption />} />
      <Route path="appointment" element={<Appointment />} />
      <Route path="dogs" element={<Dogs />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="dog/:id" element={<Dog /> } />
      <Route path="adminappointment" element={<AdminAppointment />} />

      
      
    </Route>
  )
);

// Render the app with RouterProvider to apply the routes
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
