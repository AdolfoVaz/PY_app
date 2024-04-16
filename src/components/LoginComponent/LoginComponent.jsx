import "./LoginComponent.css";
import { useState } from "react";

function LoginComponent(){

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = () => {
        const credentials = {
            user,
            password
        };

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        };
    
        fetch("http://localhost:3000/login", settings)
            .then((response) => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error("Error en la solicitud:" , response.error);
            })
            .then((data) => {
                localStorage.setItem('datos', JSON.stringify(data)); // Almacena los datos en localStorage
                const userName = data.nombre ?? "Maestro"; // Obtener el nombre de usuario
                //console.log(data);
                speak(`Inicio de sesión correcto, bienvenido ${userName}`);
                // Redirige a la página de inicio o a cualquier otra página que desees
                window.location.href = '/home';
            })
            .catch((error) => {
                console.error("Error:", error);
                setError('Datos ingresados incorrectos'); // Muestra un mensaje de error
                speak('Error en los datos de inicio de sesión');
            });
    };

    const speak = (message) => {
        const utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-brand-100 bg-cover bg-no-repeat">
            <div className="rounded-xl bg-brand-200 bg-opacity-50 px-16 py-10 opacity-75 backdrop-blur-md max-sm:px-8">
                <div className="text-white">
                <div className="mb-8 flex flex-col items-center">
                    <h1 className="mb-2 text-brand-400">PROJECT YUCATÁN</h1>
                    <img src="/src/assets/img/py2.png" width="150" alt=""  />
                    <span className="text-brand-300">Ingrese sus datos de usuario</span>
                </div>
                <form action="#">
                    <div className="mb-4 text-lg">
                        <input 
                            className="rounded-3xl border-none bg-brand-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" 
                            type="text" 
                            name="user" 
                            id="inputuser"
                            placeholder="Matricula@py.com" 
                            onChange={(event) => setUser(event.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4 text-lg">
                        <input 
                            className="rounded-3xl border-none bg-brand-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" 
                            type="Password" 
                            placeholder="●●●●●●●●"
                            id="inputpassword"
                            name="password" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="mt-8 flex justify-center text-lg text-black">
                        <button 
                            type="button" 
                            className="rounded-3xl bg-brand-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-brand-300 hover:text-black"
                            onClick={login}
                        >
                            Entrar
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>  
    );
}

export default LoginComponent;
