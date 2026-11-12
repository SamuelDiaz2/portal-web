import './vision.css';
import imgVision from '../../assets/img/fisioterapeuta-balon.avif';

function Vision() {
  return (
    <section id="vision" className="vision-section">
      <div className="vision-wrapper">
        <div className="vision-card">
          {/* LADO DEL TEXTO (IZQUIERDA) */}
          <div className="vision-text-container">
            <div className="vision-pill-tag">
              <span className="vision-dot"></span>
              <span>Nuestra Meta</span>
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
              src={imgVision}
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
