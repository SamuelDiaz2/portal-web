import './vision.css';
 

function Vision() {
    return (
        <section className="vision-section">
            <div className="vision-container">

                {/* LADO IZQUIERDO: Texto */}
                <div className="vision-text-container">
                    <span className="vision-subtitle">NUESTRA META</span>
                        <h2 className="vision-title">Visión</h2>
                        <p className="vision-description">
                            Ser considerados los mejores en nuestro campo por la atención y servicio 
                            prestados a nuestros pacientes por medio de la confianza que brindan 
                            nuestros profesionales.
                        </p>

                </div>

                {/* LADO DERECHO: Imagen con corte diagonal inverso */}
                <div className="vision-image-container">
                    <img src="https://img.freepik.com/fotos-premium/mujer-joven-oriente-medio-uniforme-fisioterapeuta-sosteniendo-pelota-clinica_926199-4265108.jpg?ga=GA1.1.988028836.1761012486&semt=ais_hybrid&w=740&q=80" alt="Profesionales de salud" className="vision-image" />
                </div>

            </div>
        </section>
    );
}

export default Vision;