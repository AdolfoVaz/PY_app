import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import SidebarComponent from '../../components/SidebarComponent/SidebarComponent';
import GridComponent from '../../components/GridComponent/GridComponet';
import Modalist from '../../components/ModalComponent/ModalComponent';

function Materias() {
    const [materias, setMaterias] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMateria, setSelectedMateria] = useState(null);
 
    // Obtener datos de materias y alumnos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const materiasResponse = await fetch("http://localhost:3000/materias");
                const alumnosResponse = await fetch("http://localhost:3000/alumnos");
                const materiasData = await materiasResponse.json();
                const alumnosData = await alumnosResponse.json();
                setMaterias(materiasData);
                setAlumnos(alumnosData);
                console.log(alumnosData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    const handleOpenModal = (materia) => {
        setSelectedMateria(materia);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
            <div className='flex items-center justify-center bg-brand-300 bg-cover bg-no-repeat'>
                <NavbarComponent />
            </div>
            <SidebarComponent />
            <GridComponent>
                {materias.map((materia) => (
                    <div key={materia.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
                        <div className="md:flex">
                            <div className="p-8">
                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Materia</div>
                                <p className="block mt-1 text-lg leading-tight font-medium text-black">{materia.nombre}</p>
                                <p className="mt-2 text-gray-500"></p>
                                <button
                                    type="button"
                                    onClick={() => handleOpenModal(materia)}
                                    className="bg-brand-200 text-brand-400 hover:text-white border border-green-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900"
                                >
                                    Agregar Calificaciones
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </GridComponent>
            {isModalOpen && <Modalist alumnos={alumnos} materia={selectedMateria} closeModal={handleCloseModal} />}
        </div>
    );
}

export default Materias;
