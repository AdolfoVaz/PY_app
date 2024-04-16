import React from 'react';
import { useState,useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table from '../../components/CRUDComponent/TableComponent';
import Modal from '../../components/CRUDComponent/ModalComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import SidebarComponent from '../../components/SidebarComponent/SidebarComponent';
import GridComponent from '../../components/GridComponent/GridComponet';


function Listado() {

  const [alumnos, setAlumnos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
};

const closeModal = () => {
    setIsModalOpen(false);
};

  const getData = async () =>{
      try {
          const response = await fetch("http://localhost:3000/alumnos");
          const data = await response.json();
          console.log(data);
          setAlumnos(data);
          
      } catch (error) {
          console.error("Error fetch data", error);
      }
  };

  useEffect(()=>{
    getData()
  },[])

  useEffect(() => {
    // Verificar el rol almacenado en localStorage
    const userData = localStorage.getItem('datos');
    if (userData) {
      const { rol } = JSON.parse(userData);
      // Si el rol es "Estudiante", redirigir a la ruta "/home"
      if (rol === "Estudiante") {
        window.location.href = '/home';
      }
    }
  }, []);


  return (
    <div className='h-screen w-full'>
        <div className='flex  items-center justify-center bg-brand-300 bg-cover bg-no-repeat'>
        <NavbarComponent></NavbarComponent>
        </div>
        <div>
        <SidebarComponent></SidebarComponent>
        </div>
        <div>
        <GridComponent>
              <div>
              <h4 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-brand-100">
                  <span className="text-brand-400 dark:text-brand-400">
                      Tabla</span>  Alumnos</h4>
              <div className="p-4 border-2 border-brand-100 border-dashed rounded-lg dark:border-brand-100">
              <button 
              type="button"
              onClick={openModal} 
              className="bg-brand-200 text-brand-400 hover:text-white border border-green-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900">
              Agregar Alumno</button>

              <table className="border-collapse w-full ">
                          <thead>
                              <tr>
                              <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                              Id
                              </th>
                              <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                              Nombre
                              </th>
                              <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                              Grado
                              </th>
                              <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                              Edad
                              </th>
                              <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                              Accion
                              </th>
                              </tr>
                          </thead>
                          <tbody>
                             {alumnos.map((alumnos) => (
                               <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Id</span>
                                      {alumnos._id}
                                  </td>
                                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Nombre</span>
                                      {alumnos.nombre}
                                  </td>
                                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Grado</span>
                                      {alumnos.grado}
                                  </td>
                                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Edad</span>
                                      {alumnos.edad}
                                  </td>
                                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Accion</span>
                                      <button 
                                      type="button" 
                                      className="bg-brand-200 text-brand-400 hover:text-white border border-green-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900">
                                      Editar</button>
                                      <button 
                                      type="button" 
                                      className="bg-brand-200 text-brand-400 hover:text-white border border-red-400 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-900">
                                      Eliminar</button>
                                  </td>
                              </tr>

                             ))}             
                          </tbody>
                      </table> 

              </div>
              {isModalOpen && (
                      <div className="fixed z-10 inset-0 overflow-y-auto">
                          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                              </div>
                              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                      <div className="sm:flex sm:items-start">
                                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                              </svg>
                                          </div>
                                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                  Formulario de registro nuevo
                                              </h3>
                                              <div className="mt-2">
                                                  <p className="text-sm text-gray-500">
                                                      Inserta los datos.
                                                  </p>
                                                  <div className=" border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                                                          <form className="max-w-sm mx-auto">
                                                          <div className="mb-5">
                                                              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre Completo</label>
                                                              <input 
                                                              type="text" 
                                                              id="" 
                                                              className="bg-brand-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                              placeholder="Nombre(s) Apellidos" 
                                                              required />
                                                          </div>
                                                          </form>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                  <button 
                                      onClick={closeModal}
                                      type="button" 
                                      className="bg-brand-200 text-brand-400 hover:text-white border border-green-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900">
                                      Agregar</button>
                                      <button 
                                      onClick={closeModal}
                                      type="button" 
                                      className="bg-brand-200 text-brand-400 hover:text-white border border-red-400 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-900">
                                      Cancelar</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}
      
              </div>
        </GridComponent>
        </div>    
   </div>
  );
}
 
export default Listado;
