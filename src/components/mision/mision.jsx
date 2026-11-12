import './mision.css';

function Mision() {
  return (
    <section id="mision" className="mision-section">
      <div className="mision-wrapper">
        <div className="mision-card">
          {/* LADO DE LA IMAGEN CON MARCO ELEGANTE */}
          <div className="mision-image-container">
            <img
              src="../../src/assets/img/retrato-fisioterapeuta.avif"
              alt="Fisioterapeuta profesional atendiendo paciente"
              className="mision-image"
            />
            <div className="mision-badge-floating">
              <span className="badge-icon">🌿</span>
              <span>Compromiso con tu Salud</span>
            </div>
          </div>

          {/* LADO DEL TEXTO */}
          <div className="mision-text-container">
            <div className="mision-pill-tag">
              <span className="mision-dot"></span>
              <span>Nuestra Pasión</span>
            </div>
            
            <h2 className="mision-heading">
              Nuestra <span className="mision-gradient">Misión</span>
            </h2>

            <p className="mision-description">
              Ofrecer servicios de salud y rehabilitación con los más altos estándares a las personas y familias de toda Cundinamarca, superando expectativas mediante un mejoramiento progresivo y personalizado que devuelva la independencia y calidad de vida a cada paciente.
            </p>

            <div className="mision-features-list">
              <div className="mision-feature-item">
                <span className="feature-check">✓</span>
                <span>Atención cálida, humana e individualizada</span>
              </div>
              <div className="mision-feature-item">
                <span className="feature-check">✓</span>
                <span>Cobertura domiciliaria e institucional en Cundinamarca</span>
              </div>
              <div className="mision-feature-item">
                <span className="feature-check">✓</span>
                <span>Equipamiento moderno y terapias avanzadas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mision;
