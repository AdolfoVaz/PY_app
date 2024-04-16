import React, { useState } from 'react';
import "./ModalEditComponent.css";

function ModalComponent({ alumnos, materia, closeModal }) {
    const [calificaciones, setCalificaciones] = useState({});
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSubmitButton, setShowSubmitButton] = useState(true);

    const handleCalificacionChange = (alumnoId, event) => {
        const newCalificaciones = { ...calificaciones };
        newCalificaciones[alumnoId] = event.target.value;
        setCalificaciones(newCalificaciones);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const calificacionesArray = Object.keys(calificaciones).map((alumnoId) => ({
                userId: alumnoId,
                materiaId: materia._id,
                calificacion: calificaciones[alumnoId] || 0 // Si la calificación no está definida, asignamos 0 por defecto
            }));
    
            const settingsCalificaciones = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(calificacionesArray),
            };
    
            const response = await fetch("http://localhost:3000/agregar/calificacion", settingsCalificaciones);
            if (response.ok) {
                setSuccessMessage('Calificaciones agregadas exitosamente');
                setShowSuccessMessage(true);
                setShowSubmitButton(false); // Ocultar el botón de "Agregar calificaciones"
            } else {
                throw new Error('Error al enviar las calificaciones');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error al enviar las calificaciones');
        }
    };

    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
        setSuccessMessage('');
    };
  
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                    {/* Icono u otro contenido opcional */}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Agregar Calificaciones</h3>
                                <div className="mt-2">
                                    <p>Materia: {materia.nombre}</p>
                                    {alumnos.map((alumno) => (
                                        <div key={alumno._id} className="flex items-center justify-between">
                                            <p>{alumno.nombre}</p>
                                            <input 
                                                type="number" 
                                                onChange={(event) => handleCalificacionChange(alumno._id, event)}
                                                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-indigo-500 mb-2"
                                                placeholder="Calificación"
                                            />
                                        </div>
                                    ))}
                                    {error && <p className="text-red-500">{error}</p>}
                                    {showSuccessMessage && (
                                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-2" role="alert">
                                            <p className="font-bold">Éxito:</p>
                                            <p>{successMessage}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            {showSubmitButton && (
                                <button
                                    type="submit"
                                    className="bg-brand-200 text-brand-400 hover:text-white border border-green-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900"
                                >
                                    Agregar calificaciones
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
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalComponent;
