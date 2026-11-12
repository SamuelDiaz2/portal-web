import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacto" className="footer-lux">
      {/* Contenedor principal de columnas */}
      <div className="footer-lux-container">

        {/* COLUMNA 1: MARCA Y PROPÓSITO */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <img src='../../src/assets/img/logo.svg' alt="Logo" />
            </div>
            <span className="footer-logo-text">REHABILITAR-C</span>
          </div>

          <p className="footer-brand-desc">
            Centro especializado en rehabilitación física, fonoaudiología, hidroterapia y bienestar integral en Cundinamarca.
          </p>

          <div className="footer-status-pill">
            <span className="status-live-dot"></span>
            <span>Atención Médica y Domiciliaria Activa</span>
          </div>
        </div>

        {/* COLUMNA 2: NAVEGACIÓN RÁPIDA */}
        <div className="footer-col">
          <h4 className="footer-col-title">Navegación</h4>
          <ul className="footer-links-list">
            <li><a href="#servicios">Nuestros Servicios</a></li>
            <li><a href="#mision">Nuestra Misión</a></li>
            <li><a href="#vision">Nuestra Visión</a></li>
            <li><Link to="/agendar">Agendar Cita</Link></li>
            <li><Link to="/apk">Descargar App Móvil</Link></li>
          </ul>
        </div>

        {/* COLUMNA 3: CONTACTO Y HORARIOS */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contacto</h4>
          <div className="footer-contact-info">
            <p>
              <span className="contact-icon">📞</span>
              <a href="tel:+573197740132">+57 319 774 0132</a>
            </p>
            <p>
              <span className="contact-icon">📱</span>
              <a href="tel:+573134188109">+57 313 418 8109</a>
            </p>
            <div className="footer-schedule">
              <span className="schedule-title">Horarios de Atención:</span>
              <span>Lun a Vie: 8:00 AM - 9:00 PM</span>
              <span>Sábados: 8:00 AM - 3:00 PM</span>
            </div>
          </div>
        </div>

        {/* COLUMNA 4: REDES SOCIALES */}
        <div className="footer-col">
          <h4 className="footer-col-title">Síguenos</h4>
          <p className="footer-social-desc">
            Conoce testimonios, consejos de salud y novedades en nuestras redes:
          </p>
          <div className="footer-social-grid">
            <a
              href="https://www.instagram.com/rehabilitarc28"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn instagram"
              title="Instagram"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" />
            </a>
            <a
              href="https://www.tiktok.com/@Rehabilitarc"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn tiktok"
              title="TikTok"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61581084898463"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn facebook"
              title="Facebook"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" />
            </a>
            <a
              href="https://x.com/@c_rehabilitar"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn twitter"
              title="X / Twitter"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png" alt="Twitter" />
            </a>
          </div>
        </div>

      </div>

      {/* BARRA INFERIOR / COPYRIGHT */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <p>© {new Date().getFullYear()} <strong>Rehabilitar-C</strong>. Todos los derechos reservados.</p>
          <button type="button" onClick={scrollToTop} className="footer-back-to-top">
            <span>Volver arriba</span>
            <span className="arrow-up">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
