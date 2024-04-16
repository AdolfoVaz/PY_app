import React, { useState, useEffect } from 'react';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import Logo from '../../../src/assets/img/PY.png';
import { Link } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useState(null);

  // Función para cargar los datos del localStorage cuando se monta el componente
  useEffect(() => {
    const storedData = localStorage.getItem('datos');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="bg-brand-300 w-full">
      <div>
        <NavbarComponent />
      </div>
      <div className="py-20 md:py-28 bg-brand-300 ">
        <div className="container px-4 mx-auto">
          {userData && (
            <div className="flex flex-wrap xl:items-center -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
                <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-white bg-brand-400 uppercase rounded-9xl">Usuario: {userData.rol}</span>
                <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold text-brand-100 tracking-tight">Bienvenido {userData && userData.nombre}</h1>
                
                <div>
                  <p className="mb-8 text-lg md:text-xl text-brand-200 font-medium">Esta es una Plataforma creada para estudiantes y miembros de Project Yucatán</p>
                </div>
                
                <div className="flex flex-wrap">
                  {userData.rol === "Maestro" ? (
                    // Si el rol es Maestro, mostrar botón de "Agregar Calificaciones"
                    <div className="w-full md:w-auto py-1 md:py-0 md:mr-2">
                      <Link to="/listado/materias" className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-green-50 font-medium text-center bg-brand-400 hover:bg-brand-400 focus:ring-2 focus:ring-brand-400 focus:ring-opacity-50 border border-brand-400 rounded-md shadow-sm">
                        Agregar Calificaciones
                      </Link>
                    </div>
                  ) : (
                    // Si el rol es Estudiante u otro, mostrar botón de "Ver mis Calificaciones"
                    <div className="w-full md:w-auto py-1 md:py-0 md:mr-2">
                      <Link to="/mis" className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-green-50 font-medium text-center bg-brand-400 hover:bg-brand-400 focus:ring-2 focus:ring-brand-400 focus:ring-opacity-50 border border-brand-400 rounded-md shadow-sm">
                        Ver mis Calificaciones
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/2 px-4">
                <div className="relative mx-auto md:mr-0 max-w-max">
                  <img className="relative rounded-7xl" src={Logo} alt=""/>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
