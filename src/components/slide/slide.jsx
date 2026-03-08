import './slide.css';

function SlideImages() {

    const imagenes = [
    {
        tittle: 'imagen 1',
        img: 'https://img.freepik.com/foto-gratis/doctor-ayudando-al-paciente-rehabilitacion_23-2150321582.jpg?ga=GA1.1.988028836.1761012486&semt=ais_hybrid&w=740&q=80'
    },
    {
        tittle: 'imagen 2',
        img: 'https://img.freepik.com/foto-gratis/doctor-ayudando-al-paciente-rehabilitacion_23-2150321621.jpg?ga=GA1.1.988028836.1761012486&semt=ais_hybrid&w=740&q=80'
    },
    {
        tittle: 'imagen 3',
        img: 'https://img.freepik.com/fotos-premium/fisioterapeuta-banda-resistencia-mujer-consulta-recuperacion-experto-lesiones-o-paciente-ayuda-fisioterapia-al-cliente-ejercicios-rehabilitacion-o-estiramiento-piernas-fuerza-muscular_590464-411961.jpg?ga=GA1.1.988028836.1761012486&semt=ais_hybrid&w=740&q=80'
    },
];

    return (
        <section className="slider-viewport">
            <div className="slider-wrapper">

                <div className="slide">
                    <img src={imagenes[0].img} alt={imagenes[0].tittle} />
                </div>
                <div className="slide">
                    <img src={imagenes[1].img} alt={imagenes[1].tittle} />
                </div>
                <div className="slide">
                    <img src={imagenes[2].img} alt={imagenes[2].tittle} />
                </div>
                {/* Repetimos la primera imagen al final para un efecto infinito suave */}
                <div className="slide">
                    <img src={imagenes[0].img} alt={imagenes[0].tittle} />
                </div>
            </div>
        </section>
    );
}

export default SlideImages;