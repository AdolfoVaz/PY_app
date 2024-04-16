import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table from '../../components/CRUDComponent/TableComponent';
import Modal from '../../components/CRUDComponent/ModalComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import SidebarComponent from '../../components/SidebarComponent/SidebarComponent';
import GridComponent from '../../components/GridComponent/GridComponet';

function Listado() {
    const [alumnos, setAlumnos] = useState([]);
    const [user, getUser] = useState();
    const [idalumno, getIdalumno] = useState();
    const [iduser, getIduser] = useState();
    const [password, getPassword] = useState();
    const [rol, getRol] = useState('Estudiante');
    const [nombre, getNombre] = useState();
    const [edad, getEdad] = useState();
    const [genero, getGenero] = useState();
    const [grado, getGrado] = useState('1er Cuatrimestre');
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar la visibilidad del ícono de carga
    const [isSuccess, setIsSuccess] = useState(false); // Estado para controlar la visibilidad del ícono de éxito
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [btnedit, setbtedit] = useState(false);
    const [btnagre, setBtnagre] = useState(false);
    const [editAlumno, setEditAlumno] = useState([]);
    const [dele, setDele] = useState(false);
    const [elalum, setElalum] = useState('');

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:3000/alumnos");
            const data = await response.json();
            console.log(data);
            //console.log(data);
            setAlumnos(data);
        } catch (error) {
            console.error("Error fetch data", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const toggleIsLoading = () => {
        setIsLoading(!isLoading);
    };

    const toggleIsSuccess = () => {
        setIsSuccess(!isSuccess);
    };

    const veri = (datos2) => {

        setElalum(datos2);
        console.log(datos2);
        setDele(true);

    }
    const closeModal2 = async () =>  {
        setDele(false);
      

    };

    const openModal = async (estado) => {
        
        setEditAlumno(estado);
        //console.log(estado);
        getIdalumno(estado._id);
        getIduser(estado._id_User);
        getUser(estado.user);
        getPassword(estado.password);
        getNombre(estado.nombre);
        getEdad(estado.edad);
        getGenero(estado.genero);

        //console.log("impresion 1",editAlumno);

        if(estado === "Agregar"){

            setBtnagre(true);
            setbtedit(false);

            setEditAlumno([]);
            //console.log("hola aqui agregamos")
           

        }else{

            setbtedit(true);
            setBtnagre(false);
           

            

        }
        setIsModalOpen(true);

        
    };

    const closeModal = async () =>  {
        setBtnagre(false);
        setbtedit(false);
        setEditAlumno([]);
        setIsModalOpen(false);

    };

    const registrarAlumno = () => {
        toggleIsLoading(); // Mostrar el ícono de carga al enviar los datos

        const datosUsuario = {
            user,
            password,
            rol
        };

        const settingsUsuario = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosUsuario),
        };

        fetch("http://localhost:3000/agregar/User", settingsUsuario)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error en la solicitud:", response.error);
            })
            .then((data) => {
                const idUsuario = data._id;

                const datosAlumno = {
                    nombre,
                    edad,
                    genero,
                    grado,
                    idUser: idUsuario
                };

                const settingsAlumno = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(datosAlumno),
                };

                return fetch("http://localhost:3000/agregar/alumno", settingsAlumno);
            })
            .then((response) => {
                if (response.ok) {
                    toggleIsLoading(); // Ocultar el ícono de carga después de recibir la respuesta
                    toggleIsSuccess();
                    getData();
                    setIsModalOpen(false); // Mostrar el ícono de éxito después de recibir la respuesta
                    //return response.json();
                    
                }
                throw new Error("Error en la solicitud:", response.error);
            })
            .then((data) => {
                console.log("respuesta: ", data);
            })
            .catch((error) => {
                console.error("error: ", error);
            });
    };


    const eliminarAlumno = async (id) => {
        try {
          const response = await fetch(`http://localhost:3000/alumno/eliminar/${id}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            // Alumno eliminado correctamente, actualiza la lista de alumnos
            getData();
            setDele(false);
          } else {
            throw new Error(`Error al eliminar alumno: ${response.status}`);
          }
        } catch (error) {
          console.error('Error al eliminar alumno:', error);
        }
      };

      const editarAlumno = () => {
        //toggleIsLoading(); // Mostrar el ícono de carga al enviar los datos
    
        const datosUsuario = {

            user,
            password,
            rol
        };
        console.log(iduser);
    
        const settingsUsuario = {
            method: "PUT", // Cambiar el método a PUT para actualizar el usuario existente
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosUsuario),
        };
    
        fetch(`http://localhost:3000/user/${iduser}`, settingsUsuario) // Utilizar el id del usuario para actualizarlo
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error en la solicitud:", response.error);
            })
            .then((data) => {
                const idUsuario = data._id; // No necesitas extraer el id del usuario aquí, ya lo tienes
    
                const datosAlumno = {
                    nombre,
                    edad,
                    genero,
                    grado,
                    idUser: idUsuario // Utilizar el id del usuario actualizado
                };
    
                const settingsAlumno = {
                    method: "PUT", // Cambiar el método a PUT para actualizar el alumno existente
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(datosAlumno),
                };
    
                return fetch(`http://localhost:3000/alumno/${idalumno}`, settingsAlumno); // Utilizar el id del alumno para actualizarlo
            })
            .then((response) => {
                if (response.ok) {
                    toggleIsLoading(); // Ocultar el ícono de carga después de recibir la respuesta
                    toggleIsSuccess();
                    getData();
                    setIsModalOpen(false); // Mostrar el ícono de éxito después de recibir la respuesta
                }
                throw new Error("Error en la solicitud:", response.error);
            })
            .then((data) => {
                console.log("respuesta: ", data);
            })
            .catch((error) => {
                console.error("error: ", error);
            });
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
                                onClick={() => openModal("Agregar")}
                                className="bg-brand-200 text-brand-400 hover:text-white border border-green-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900">
                                Agregar Alumno</button>

                            <table className="border-collapse w-full ">
                                <thead>
                                    <tr>
                                        <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                                            Usuario
                                    </th>
                                    <th className="p-3 font-bold uppercase bg-brand-100 text-brand-300 border border-gray-300 hidden lg:table-cell">
                                            password
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
                                                {alumnos.user}
                                            </td>
                                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Id</span>
                                                {alumnos.password}
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
                                            <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                                                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Accion</span>
                                                <button
                                                    type="button"
                                                    className="bg-brand-200 text-brand-400 hover:text-white border border-green-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900"
                                                    onClick={() => openModal(alumnos)}
                                                    >
                                                    Editar</button>
                                                <button
                                                    type="button"
                                                    className="bg-brand-200 text-brand-400 hover:text-white border border-red-400 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-900"
                                                    onClick={() => veri(alumnos._id)}
                                                    >
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
                                                   
                                                </div>
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                           
                                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                        Formulario de registro nuevo
                                                        </h3>
                                                        
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Inserta los datos.
                                                        </p>
                                                        <form className="max-w-sm mx-auto">
                                                            <div className="mb-5 grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-brand-200 ">Correo</label>
                                                                    <input
                                                                        type="text"
                                                                        name="inputUser"
                                                                        id="inputUser"
                                                                        className="bg-brand-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        placeholder="Email"
                                                                        value={user}
                                                                        onChange={(event) => {
                                                                            getUser(event.target.value);
                                                                        }}

                                                                        required
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-brand-200">Password</label>
                                                                    <input
                                                                        type="text"
                                                                        name="inputpassword"
                                                                        id="inputpassword"
                                                                        className="bg-brand-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        placeholder="password"
                                                                        value={password}
                                                                        onChange={(event) => {
                                                                            getPassword(event.target.value);
                                                                        }}
                                                                        required
                                                                        onkeypress="return validar(event)"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="mb-5">
                                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-brand-200">
                                                                    Nombre
                                                            </label>
                                                                <input
                                                                    type="text"
                                                                    name="inputNombre"
                                                                    id="inputNombre"
                                                                    className="bg-brand-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="Nombre"
                                                                    value={nombre}
                                                                    onChange={(event) => {
                                                                        getNombre(event.target.value);
                                                                    }}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="mb-5">
                                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-brand-200">
                                                                    Edad
                                                            </label>
                                                                <input
                                                                    type="number"
                                                                    name="inputEdad"
                                                                    id="inputEdad"
                                                                    className="bg-brand-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="Edad"
                                                                    value={edad}
                                                                    onChange={(event) => {
                                                                        getEdad(event.target.value);
                                                                    }}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="mb-5">
                                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-brand-200">
                                                                    Género
                                                            </label>
                                                                <select
                                                                    name="inputGenero"
                                                                    id="inputGenero"
                                                                    className="bg-brand-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    value={genero}
                                                                    onChange={(event) => {
                                                                        getGenero(event.target.value);
                                                                    }}
                                                                    required
                                                                >
                                                                    <option value="">Seleccionar Género</option>
                                                                    <option value="hombre">Hombre</option>
                                                                    <option value="mujer">Mujer</option>
                                                                </select>
                                                            </div>
                                                            <input
                                                                    hidden
                                                                    value={iduser}
                                                                    
                                                                />
                                                                <input
                                                                    
                                                                    hidden
                                                                    value={idalumno}
                                                                    
                                                                />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            {btnedit && (
                                                <button
                                                    onClick={() => editarAlumno()}
                                                    type="button"
                                                    className="bg-brand-200 text-brand-400 hover:text-white border border-green-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900"
                                                >
                                                    Editar
                                                </button>

                                            )}
                                            {btnagre && (
                                                <button
                                                    onClick={() => registrarAlumno()}
                                                    type="button"
                                                    className="bg-brand-200 text-brand-400 hover:text-white border border-brand-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900"
                                                >
                                                    Agregar hola
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
                        {dele && (
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
                                                                                ¿Seguro quieres eliminar este alumno?
                                                                                </h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
  
                                                                        <button
                                                                            onClick={() => eliminarAlumno(elalum)}
                                                                            type="button"
                                                                            className="bg-brand-200 text-brand-400 hover:text-white border border-red-400 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-900"
                                                                            
                                                                        >
                                                                            Eliminar
                                                                        </button>
                        
                                                                    
                                                                    <button
                                                                        onClick={closeModal2}
                                                                        type="button"
                                                                        className="bg-brand-200 text-brand-400 hover:text-white border border-brand-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900"
                                                                        
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
