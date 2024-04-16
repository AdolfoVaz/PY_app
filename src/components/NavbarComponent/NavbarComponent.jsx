import "./NavbarComponent.css";

function NavbarComponent(props){

    //console.log(props.nombre);
    //let datos = props;

    return (
        <nav className="fixed top-0 z-50 w-full bg-brand-100 rounded border-b border bg-brand-100 dark:border-brand-100">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                <div className="flex items-center justify-start ">
                    <a href="" className="flex ms-2 md:me-24">
                    <img src="/src/assets/img/py3.png" className="h-12 me-3" alt="Logo" />
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-brand-400">PROJECT YUCATÁN</span>
                    </a>
                </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarComponent;