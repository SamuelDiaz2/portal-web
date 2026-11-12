import './head.css';

function Head() {

    const imagenes = [
        {
            tittle: 'imagen 1',
            img: '../../src/assets/img/doctor-ayudando-al-paciente-rehabilitacion.avif'
        },
        {
            tittle: 'imagen 2',
            img: '../../src/assets/img/doctor-ayudando.avif'
        },
        {
            tittle: 'imagen 3',
            img: '../../src/assets/img/fisioterapeuta-banda.avif'
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

export default Head;