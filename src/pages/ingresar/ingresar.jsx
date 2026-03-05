import './ingresar.css';
import { Link } from 'react-router-dom';


function Ingresar() {
    return (
        <>
        <div className="Fisioterapeuta">
            <button><Link to="/apk">Fisioterapeuta</Link></button>
        </div>
        <div className="Paciente">
            <button><Link to="/login">Paciente</Link></button>
        </div>
        <div className="Admin">
            <button><Link to="/registro">Admin</Link></button>
        </div>
        </>
    );
}

export default Ingresar;