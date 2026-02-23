import './servicios.css';

const serviciosData = [
    {
        title: 'Rehabilitación Física',
        description: 'Programas personalizados para mejorar la movilidad y reducir el dolor.',
        img: 'images/rehabilitacion_fisica.jpg' // Asegúrate de tener esta imagen en tu carpeta de imágenes
    },
    {
        title: 'Fisioterapia',
        description: 'Tratamientos especializados para lesiones musculares y articulares.',
        img: 'images/fisioterapia.jpg' // Asegúrate de tener esta imagen en tu carpeta de imágenes
    },
    {
        title: 'Rehabilitación Neurológica',
        description: 'Apoyo para pacientes con condiciones neurológicas como accidentes cerebrovasculares.',
        img: 'images/rehabilitacion_neurologica.jpg' // Asegúrate de tener esta imagen en tu carpeta de imágenes
    },
    {
        title: 'Rehabilitación Cardíaca',
        description: 'Programas de ejercicio y educación para pacientes con enfermedades cardíacas.',
        img: 'images/rehabilitacion_cardiaca.jpg' // Asegúrate de tener esta imagen en tu carpeta de imágenes
    }
];

function Servicios() {
    return (
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
    );
}

export default Servicios;
