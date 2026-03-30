import './servicios.css';
import serviciosData from './servicios.json';
import { useState } from 'react';

function Servicios() {
    const [categoriaActual, setCategoriaActual] = useState("Física");

    // Filtramos los datos basados en la categoría seleccionada
    const serviciosFiltrados = serviciosData.filter(
        item => item.categoria === categoriaActual
    );  

    return (
        <section className="servicios-section">
            <div className="servicios-container">
                <h2>Nuestros Servicios</h2>
                
                {/* --- NUEVO SELECTOR SEGMENTADO --- */}
                <div className='eleccion-servicios'>
                    <div className="segmented-control">
                        {/* El indicador es la "pastilla" negra que se mueve detras */}
                        <div className={`indicator ${categoriaActual === "Psicología" ? "move-right" : ""}`}></div>
                        
                        <button
                            className={`btn-tab ${categoriaActual === "Física" ? "active" : ""}`}
                            onClick={() => setCategoriaActual("Física")}
                        >
                            Física
                        </button>
                        
                        <button 
                            className={`btn-tab ${categoriaActual === "Psicología" ? "active" : ""}`}
                            onClick={() => setCategoriaActual("Psicología")}
                        >
                            Psicología
                        </button>
                    </div>
                </div>

                <div className="servicios-list">
                    {serviciosFiltrados.map((item, index) => (
                        <div key={index} className="servicio-item">
                            <img src={item.img} alt={item.title} />
                            <div className="servicio-info">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Servicios;