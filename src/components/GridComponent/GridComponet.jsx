import "./GridComponent.css";
import PropTypes from 'prop-types'
function GridComponent({children}){

    return (
        <div className="p-4 sm:ml-64  ">
            <div className="p-4 border-2 rounded-lg  mt-20">
                <div className="flex flex-col items-center justify-center h-auto mb-4 rounded bg-brand-300 dark:bg-brand-300">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default GridComponent;

GridComponent.prototype = {
    children: PropTypes.node.isRequired
}