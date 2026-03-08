import './ingresar.css';
import { Link } from 'react-router-dom';


function Ingresar() {
    return (
        <section className="ingresar-container">
        <div className="Profesional">
            <button>
                <Link to="/apk">
                    <img src="https://cdn-icons-png.flaticon.com/512/998/998412.png " alt="Profesional" />
                </Link>
            </button>
            <h2>Profesional</h2>
        </div>
        <div className="Paciente">
            <button><Link to="/login">
                <img src="https://cdn-icons-png.flaticon.com/512/709/709699.png" alt="Paciente" />
            </Link></button>
            <h2>Paciente</h2>
        </div>
        </section>
    );
}

export default Ingresar;