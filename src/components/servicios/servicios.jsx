import './servicios.css';
import serviciosData from './servicios.json';

function Servicios() {
    return (
        <section className="servicios-section">
            <div className="servicios-container">
                <h2>Nuestros Servicios</h2>
                <div className="servicios-list">
                    {serviciosData.map((servicio, index) => (
                        <div key={index} className="servicio-item">
                            <h3>{servicio.title}</h3>
                            <p>{servicio.description}</p>
                            <img src={servicio.img} alt={servicio.title} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Servicios;