import "./CRUDComponent.css";

function FormsComponent(props){

    //console.log(props.nombre);
    //let datos = props;

    return (

    <div>
        <h4 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-brand-100"><span class="text-brand-400 dark:text-brand-400">Nuevo</span>  Alumno</h4>
        
        <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre Completo</label>
                <input type="text" id="" className="bg-brand-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre(s) Apellidos" required />
            </div>
            <button 
            type="button" 
            class="bg-brand-200 text-brand-400 hover:text-white border border-green-400 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-900">
            Agregar</button>
            <button 
            type="button" 
            class="bg-brand-200 text-brand-400 hover:text-white border border-red-400 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-900">
            Cancelar</button>
            </form>
        </div>
    </div>
    );
}

export default FormsComponent;