import { useState } from 'react'
import './App.css'
import { Route, Routes, Router, BrowserRouter } from 'react-router-dom';
import Login from './views/Auth/Login';
import ListadoAlumnos from './views/Alumnos/Listado';
import ListadoMaestros from './views/Maestros/Listado';
import Register from './views/Auth/Register';
import Home from './views/Auth/Home';
import Materias from './views/Calificaciones/Materias';
import ListadoCalf from './views/Calificaciones/Listado';
import Mis from './views/Calificaciones/Mis';



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Login/>}/>
        <Route  path="/register" element={<Register/>}/>
        <Route  path="/listado/alumno" element={<ListadoAlumnos/>}/> 
        <Route  path="/listado/maestro" element={<ListadoMaestros/>}/>  
        <Route  path="/listado/materias" element={<Materias/>}/>
        <Route  path="/listado/calificaciones" element={<ListadoCalf/>}/>
        <Route  path="/home" element={<Home/>}/>
        <Route  path="/mis" element={<Mis/>}/>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
