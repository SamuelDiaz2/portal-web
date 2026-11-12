import './vision.css';

function Vision() {
    return (
        <section className="vision-section">
            <h2 className="vision-title">Visión</h2>
            <div className="vision-container">

                {/* LADO IZQUIERDO: Texto */}
                <div className="vision-text-container">
                    <span className="vision-subtitle">NUESTRA META</span>
                    <p className="vision-description">
                        Ser considerados los mejores en nuestro campo por la atención y servicio
                        prestados a nuestros pacientes por medio de la confianza que brindan
                        nuestros profesionales.
                    </p>

                </div>

                {/* LADO DERECHO: Imagen con corte diagonal inverso */}
                <div className="vision-image-container">
                    <img src="../../src/assets/img/fisioterapeuta-balon.avif" alt="Profesionales de salud" className="vision-image" />
                </div>

            </div>
        </section>
    );
}

export default Vision;