import './servicios.css';

const serviciosData = [
    {
        title: 'Rehabilitación Física',
        description: 'Programas personalizados para mejorar la movilidad y reducir el dolor.',
        img: 'https://img.freepik.com/foto-gratis/doctor-ayudando-al-paciente-rehabilitacion_23-2150321582.jpg?ga=GA1.1.988028836.1761012486&semt=ais_hybrid&w=740&q=80' // Asegúrate de tener esta imagen en tu carpeta de imágenes
    },
    {
        title: 'Fisioterapia',
        description: 'Tratamientos especializados para lesiones musculares y articulares.',
        img: 'https://img.freepik.com/fotos-premium/fisioterapeutas-trabajan-pacientes-clinicas-primer-plano-concepto-rehabilitacion-salud-fisica-medico-da-consejos-al-paciente-problemas-tobillo-lesiones-musculares_265022-94328.jpg?ga=GA1.1.988028836.1761012486&semt=ais_hybrid&w=740&q=80' // Asegúrate de tener esta imagen en tu carpeta de imágenes
    },
    {
        title: 'Rehabilitación Neurológica',
        description: 'Apoyo para pacientes con condiciones neurológicas como accidentes cerebrovasculares.',
        img: 'https://img.freepik.com/foto-gratis/mujer-haciendo-sesion-terapia-ocupacional-psicologo_23-2149091470.jpg?ga=GA1.1.988028836.1761012486&semt=ais_hybrid&w=740&q=80' // Asegúrate de tener esta imagen en tu carpeta de imágenes
    },
    {
        title: 'Rehabilitación Cardíaca',
        description: 'Programas de ejercicio y educación para pacientes con enfermedades cardíacas.',
        img: 'https://www.shutterstock.com/image-vector/physiotherapist-guiding-patient-through-muscle-600nw-2701326519.jpg' // Asegúrate de tener esta imagen en tu carpeta de imágenes
    }
];

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
