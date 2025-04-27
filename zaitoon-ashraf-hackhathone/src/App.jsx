import React , { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home , Signup , Login, ProtectedRoute ,Dashboard, AddEditTask  } from './screen'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {

 
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={ <ProtectedRoute reverse={true}><Home /></ProtectedRoute>}/>

    {/* Signup page (agar already login hai to dashboard bhejna) */}
    <Route path="/signup" element={ <ProtectedRoute reverse={true}><Signup /></ProtectedRoute>}/>

      
    {/* Login page (agar already login hai to dashboard bhejna) */}
    <Route path="/login" element={ <ProtectedRoute reverse={true}><Login /></ProtectedRoute>}/>


    {/* Dashboard (agar login nahi to login page bhejna) */}
    <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />

    <Route path="/add" element={<AddEditTask/>}></Route>

   
   


    </Routes>
    <ToastContainer position='top-center'/>
    </BrowserRouter>
  )
}

export default App

