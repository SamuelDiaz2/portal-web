import './vision.css';

function Vision() {
<<<<<<< HEAD
  return (
    <section id="vision" className="vision-section">
      <div className="vision-wrapper">
        <div className="vision-card">
          {/* LADO DEL TEXTO (IZQUIERDA) */}
          <div className="vision-text-container">
            <div className="vision-pill-tag">
              <span className="vision-dot"></span>
              <span>Nuestra Meta</span>
=======
    return (
        <section className="vision-section">
            <h2 className="vision-title">Visión</h2>
            <div className="vision-container">
                
                <div className="vision-text-container">
                    <span className="vision-subtitle">NUESTRA META</span>
                        <p className="vision-description">
                            Ser considerados los mejores en nuestro campo por la atención y servicio 
                            prestados a nuestros pacientes por medio de la confianza que brindan 
                            nuestros profesionales.
                        </p>

                </div>

                <div className="vision-image-container">
                    <img src="https://img.freepik.com/fotos-premium/mujer-joven-oriente-medio-uniforme-fisioterapeuta-sosteniendo-pelota-clinica_926199-4265108.jpg?ga=GA1.1.988028836.1761012486&semt=ais_hybrid&w=740&q=80" alt="Profesionales de salud" className="vision-image" />
                </div>

>>>>>>> c3ccdb12b8295e42b21d251f186c0e7f1e387626
            </div>

            <h2 className="vision-heading">
              Nuestra <span className="vision-gradient">Visión</span>
            </h2>

            <p className="vision-description">
              Ser reconocidos como el centro líder en rehabilitación integral y terapias de salud, distinguidos por la excelencia de nuestros tratamientos, la tecnología de punta y la confianza inquebrantable que nuestros profesionales construyen con cada paciente.
            </p>

            <div className="vision-features-list">
              <div className="vision-feature-item">
                <span className="vision-check">★</span>
                <span>Liderazgo e innovación en fisioterapia y rehabilitación</span>
              </div>
              <div className="vision-feature-item">
                <span className="vision-check">★</span>
                <span>Planes de recuperación basados en evidencia clínica</span>
              </div>
              <div className="vision-feature-item">
                <span className="vision-check">★</span>
                <span>Acompañamiento continuo y cercano al paciente y su familia</span>
              </div>
            </div>
          </div>

          {/* LADO DE LA IMAGEN (DERECHA) */}
          <div className="vision-image-container">
            <img
              src="../../src/assets/img/fisioterapeuta-balon.avif"
              alt="Especialista en rehabilitación con paciente"
              className="vision-image"
            />
            <div className="vision-badge-floating">
              <span className="badge-icon">⭐</span>
              <span>Hacia la Excelencia Médica</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vision;
