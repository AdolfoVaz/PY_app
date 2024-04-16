import React, { useState, useEffect } from 'react';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

function Mis() {
    const [calificaciones, setCalificaciones] = useState([]);
    const [materiaFilter, setMateriaFilter] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('');
    const [materias, setMaterias] = useState([]);

    const getData = async () => {
        try {
            const userData = localStorage.getItem('datos');
            if (userData) {
                const { idAlumno } = JSON.parse(userData);
                const response = await fetch(`http://localhost:3000/miscalificaciones/${idAlumno}`);
                const data = await response.json();
                setCalificaciones(data);
                // Obtener materias únicas de las calificaciones
                const uniqueMaterias = [...new Set(data.map(calificacion => calificacion.materia))];
                setMaterias(uniqueMaterias);
            }
        } catch (error) {
            console.error("Error fetch data", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="w-full">
            <div>
                <NavbarComponent />
            </div>
            <div className="py-20 md:py-28 ">
                <div className="container px-4 mx-auto">
                    <h1  className="text-center mb-8 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold text-brand-100 tracking-tight">Mis Calificaciones</h1>
                    <div className="mb-4">
                        <label htmlFor="materiaFilter">Filtrar por Materia:</label>
                        <select id="materiaFilter" onChange={(e) => setMateriaFilter(e.target.value)}>
                            <option value="">Todas las materias</option>
                            {materias.map((materia, index) => (
                                <option key={index} value={materia}>{materia}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="estadoFilter">Filtrar por Estado:</label>
                        <select id="estadoFilter" onChange={(e) => setEstadoFilter(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="reprobado">Reprobados</option>
                            <option value="aprobado">Aprobados</option>
                        </select>
                    </div>
                    <div className="p-4 border-2 border-brand-100 border-dashed rounded-lg dark:border-brand-100">
                        <table className="border-collapse w-full">
                            <thead>
                                <tr>
                                    <th className="p-3 font-bold uppercase bg-brand-300 text-brand-100 border  lg:table-cell" >Materia</th>
                                    <th className="p-3 font-bold uppercase bg-brand-300 text-brand-100 border  lg:table-cell">Calificación</th>
                                    <th className="p-3 font-bold uppercase bg-brand-300 text-brand-100 border  lg:table-cell">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calificaciones.filter((calificacion) =>
                                    (!materiaFilter || calificacion.materia === materiaFilter) &&
                                    (!estadoFilter || (estadoFilter === 'reprobado' && calificacion.calificacion < 80) ||
                                        (estadoFilter === 'aprobado' && calificacion.calificacion >= 80))
                                ).map((calificacion, index) => (
                                    <tr key={index}>
                                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">{calificacion.materia}</td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">{calificacion.calificacion}</td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">{calificacion.calificacion < 80 ? 'Reprobado' : 'Aprobado'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mis;
