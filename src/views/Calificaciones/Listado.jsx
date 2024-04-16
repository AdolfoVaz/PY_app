import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table from '../../components/CRUDComponent/TableComponent';
import Modal from '../../components/CRUDComponent/ModalComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import SidebarComponent from '../../components/SidebarComponent/SidebarComponent';
import GridComponent from '../../components/GridComponent/GridComponet';

function Listado() {
    const [calificaciones, setCalificaciones] = useState([]);
    const [_id, get_id] = useState();
    const [alumnoid, getAlumnoid] = useState();
    const [alumno, getAlumno] = useState();
    const [materia, getMateria] = useState();
    const [materiaid, getmateriaid] = useState(); 
    const [iduser, getIduser] = useState();
    const [editcalificacion, getEditcalificacion] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [btnedit, setbtedit] = useState(false);
    const [btnagre, setBtnagre] = useState(false);
    const [alumnos, setAlumnos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');
    const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
    const [filtroSeleccionado, setFiltroSeleccionado] = useState('');

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:3000/calificaciones");
            const data = await response.json();
            setCalificaciones(data);
        } catch (error) {
            console.error("Error fetch data", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

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

    useEffect(() => {
        const alumnosUnicos = [...new Set(calificaciones.map(calif => calif.alumno))];
        const materiasUnicas = [...new Set(calificaciones.map(calif => calif.materia))];
        setAlumnos(alumnosUnicos);
        setMaterias(materiasUnicas);
    }, [calificaciones]);

    const filtrarCalificaciones = () => {
        let calificacionesFiltradas = [...calificaciones];

        if (alumnoSeleccionado) {
            calificacionesFiltradas = calificacionesFiltradas.filter(calif => calif.alumno === alumnoSeleccionado);
        }
    
        if (materiaSeleccionada) {
            calificacionesFiltradas = calificacionesFiltradas.filter(calif => calif.materia === materiaSeleccionada);
        }
    
        if (filtroSeleccionado === 'reprobados') {
            calificacionesFiltradas = calificacionesFiltradas.filter(calif => calif.calificacion < 80);
        }
    
        return calificacionesFiltradas;

    };

    const toggleIsLoading = () => {
        setIsLoading(!isLoading);
    };

    const toggleIsSuccess = () => {
        setIsSuccess(!isSuccess);
    };

    const openModal = async (estado) => {
        console.log(estado);
        getAlumnoid(estado.alumnoid);
        getmateriaid(estado.materiaid);
        get_id(estado._id);
        getEditcalificacion(estado.calificacion);
        getAlumno(estado.alumno);
        getMateria(estado.materia);

        if (estado === "Agregar") {
            setBtnagre(true);
            setbtedit(false);
            setEditAlumno([]);
        } else {
            setbtedit(true);
        }
        setIsModalOpen(true);
    };

    const closeModal = async () => {
        setIsModalOpen(false);
        setbtedit(false);
        setEditAlumno([]);
    };

    const editarCalif = () => {
        const datosCalif = {
            userId: alumnoid,
            materiaId: materiaid,
            calificacion: editcalificacion
        };

        const settingsUsuario = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosCalif),
        };

        fetch(`http://localhost:3000/calificacion/${_id}`, settingsUsuario)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la solicitud: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Respuesta del servidor: ", data);
                getData();
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error("Error al enviar la solicitud: ", error);
            });
    };

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
                                Tabla</span>  Calificaciones</h4>
                                <select value={alumnoSeleccionado} onChange={e => setAlumnoSeleccionado(e.target.value)}>
                                    <option value="">Todos los alumnos</option>
                                    {alumnos.map((alumno, index) => (
                                        <option key={index} value={alumno}>{alumno}</option>
                                    ))}
                                </select>
                                <select value={materiaSeleccionada} onChange={e => setMateriaSeleccionada(e.target.value)}>
                                    <option value="">Todas las materias</option>
                                    {materias.map((materia, index) => (
                                        <option key={index} value={materia}>{materia}</option>
                                    ))}
                                </select>
                                <select value={filtroSeleccionado} onChange={e => setFiltroSeleccionado(e.target.value)}>
                                    <option value="">Todos</option>
                                    <option value="reprobados">Reprobados</option>
                                </select>
                        <div className="p-4 border-2 border-brand-100 border-dashed rounded-lg dark:border-brand-100">
                            <table className="border-collapse w-full">
                                <thead>
                                    <tr>
                                        <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                                            Materia
                                    </th>
                                        <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                                            Alumno
                                    </th>
                                        <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                                            Calificacion
                                    </th>
                                        <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                                            estado
                                    </th>
                                        <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                                            Accion
                                    </th>
                                    </tr>
                                </thead>
                                    <tbody>
                                    {filtrarCalificaciones().map((calificacion) => (
                                            <tr key={calificacion._id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Id</span>
                                                    {calificacion.materia}
                                                </td>
                                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Id</span>
                                                    {calificacion.alumno}
                                                </td>
                                                <td className={`w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static ${calificacion.calificacion < 80 ? 'bg-red-500' : 'bg-green-500'}`}>
                                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Calificación</span>
                                                    {calificacion.calificacion}
                                                </td>
                                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                                    {calificacion.calificacion < 80 ? 'Reprobado' : 'Aprobado'}
                                                </td>
                                                <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Accion</span>
                                                    <button
                                                        type="button"
                                                        className="bg-brand-200 text-brand-400 hover:text-white border border-green-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900"
                                                        onClick={() => openModal(calificacion)}
                                                    >
                                                        Editar
                                                    </button>
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
                                                </div>
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                        Editar la calificacion de la materia de {materia}
                                                    </h3>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Inserta la nueva calificacion
                                                        </p>
                                                        <form className="max-w-sm mx-auto">
                                                            <div className="mb-5 grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-brand-200 ">
                                                                        {alumno}</label>
                                                                    <input
                                                                        type="number"
                                                                        name="inputcalf"
                                                                        id="inputcalf"
                                                                        className="bg-brand-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        placeholder="Calificacion"
                                                                        value={editcalificacion}
                                                                        onChange={(event) => {
                                                                            getEditcalificacion(event.target.value);
                                                                        }}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            {btnedit && (
                                                <button
                                                    onClick={() => editarCalif()}
                                                    type="button"
                                                    className="bg-brand-200 text-brand-400 hover:text-white border border-green-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900"
                                                >
                                                    Editar
                                                </button>
                                            )}
                                            <button
                                                onClick={closeModal}
                                                type="button"
                                                className="bg-brand-200 text-brand-400 hover:text-white border border-red-400 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-900"
                                            >
                                                Cancelar
                                            </button>
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
