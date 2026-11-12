import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId) => {
    setMenuAbierto(false);
    if (!sectionId) return;

    if (location.pathname !== '/inicio' && location.pathname !== '/') {
      navigate('/inicio');
      setTimeout(() => {
        const elemento = document.getElementById(sectionId);
        if (elemento) elemento.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const elemento = document.getElementById(sectionId);
      if (elemento) elemento.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="reh-navbar-wrapper">
      <div className="reh-navbar-container">
        {/* LOGO IZQUIERDA */}
        <NavLink to="/inicio" className="reh-logo" onClick={() => setMenuAbierto(false)}>
          <div className="reh-logo-icon">
            <img src='../../src/assets/img/logo.svg' alt="Logo" />
          </div>
          <span className="reh-logo-text">REHABILITAR-C</span>
        </NavLink>

        {/* CÁPSULA CENTRAL (ESTILO FLY.IO GLASS) */}
        <nav className="reh-nav-pill">
          <NavLink
            to="/inicio"
            className={({ isActive }) => `reh-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => handleNavClick()}
          >
            Inicio
          </NavLink>

          <button
            type="button"
            className="reh-nav-link"
            onClick={() => handleNavClick('servicios')}
          >
            Servicios
          </button>

          <button
            type="button"
            className="reh-nav-link"
            onClick={() => handleNavClick('mision')}
          >
            Misión
          </button>

          <button
            type="button"
            className="reh-nav-link"
            onClick={() => handleNavClick('vision')}
          >
            Visión
          </button>

          <button
            type="button"
            className="reh-nav-link"
            onClick={() => handleNavClick('contacto')}
          >
            Contacto
          </button>

          <NavLink
            to="/apk"
            className={({ isActive }) => `reh-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMenuAbierto(false)}
          >
            App APK
          </NavLink>
        </nav>

        {/* ACCIONES DERECHA (LOGIN MORADO + REGISTRO BOTÓN ACENTO) */}
        <div className="reh-actions-pill">
          <NavLink
            to="/login"
            className="reh-btn-login"
            onClick={() => setMenuAbierto(false)}
          >
            Ingresar
          </NavLink>

          <NavLink
            to="/registro"
            className="reh-btn-register"
            onClick={() => setMenuAbierto(false)}
          >
            Registrarse
          </NavLink>
        </div>

        {/* BOTÓN MÓVIL (HAMBURGUESA) */}
        <button
          type="button"
          className={`reh-mobile-toggle ${menuAbierto ? 'open' : ''}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE GLASS */}
      <div className={`reh-mobile-menu ${menuAbierto ? 'active' : ''}`}>
        <NavLink
          to="/inicio"
          className="reh-mobile-link"
          onClick={() => { setMenuAbierto(false); handleNavClick(); }}
        >
          Inicio
        </NavLink>
        <button
          type="button"
          className="reh-mobile-link"
          onClick={() => handleNavClick('servicios')}
        >
          Servicios
        </button>
        <button
          type="button"
          className="reh-mobile-link"
          onClick={() => handleNavClick('mision')}
        >
          Misión
        </button>
        <button
          type="button"
          className="reh-mobile-link"
          onClick={() => handleNavClick('vision')}
        >
          Visión
        </button>
        <button
          type="button"
          className="reh-mobile-link"
          onClick={() => handleNavClick('contacto')}
        >
          Contacto
        </button>
        <NavLink
          to="/apk"
          className="reh-mobile-link"
          onClick={() => setMenuAbierto(false)}
        >
          Descargar APK
        </NavLink>

        <div className="reh-mobile-actions">
          <NavLink
            to="/login"
            className="reh-btn-login mobile"
            onClick={() => setMenuAbierto(false)}
          >
            Ingresar
          </NavLink>
          <NavLink
            to="/registro"
            className="reh-btn-register mobile"
            onClick={() => setMenuAbierto(false)}
          >
            Registrarse
          </NavLink>
        </div>
      </div>
    </header>
  );
}
