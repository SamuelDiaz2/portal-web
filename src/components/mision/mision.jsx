import './mision.css';
// Importa tu imagen. Asegúrate de que esté en src/assets/ o usa una URL


function Mision() {
    return (
        <section className="mision-section">
            <h2 className="mision-title">Misión</h2>
            <div className="mision-container">
        
                {/* Contenedor de la imagen con el corte diagonal */}
                <div className="mision-image-container">
                    <img src="https://img.freepik.com/fotos-premium/retrato-fisioterapeuta-caucasica-feliz-bata-hospital_13339-335481.jpg?ga=GA1.1.988028836.1761012486&semt=ais_hybrid&w=740&q=80" alt="Equipo de salud trabajando" className="mision-image" />
                </div>
                    {/* Bloque de texto de la misión */}
                <div className="mision-text-container">
                    <span className="mision-subtitle">NUESTRA PASIÓN</span>
                        <p className="mision-description">
                            Ofrecer nuestros servicios de salud a las personas de todo Cundinamarca, 
                            de nuestros pacientes y cumplir con las expectativas para tener un 
                            mejoramiento progresivo, utilizando los recursos a nuestra disposición.
                        </p>
                </div>
            </div>
        </section>
    );
}

export default Mision;