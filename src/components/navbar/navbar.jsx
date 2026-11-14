import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase.js';
import Logo from '../../assets/img/logo.svg';
import './navbar.css';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verificarUsuario = async () => {
      // 1. Verificar si hay paciente logueado en Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const nombreCompleto = user.user_metadata?.nombre_completo || 'Paciente';
        const primerNombre = nombreCompleto.trim().split(' ')[0];
        setUsuarioActivo({ primerNombre, ruta: '/dashboard' });
        return;
      }

      // 2. Verificar si hay profesional logueado en localStorage
      const sesionProfesional = localStorage.getItem('sesion');
      const nombreProfesional = localStorage.getItem('usuarioNombre');
      if (sesionProfesional && nombreProfesional) {
        const primerNombre = nombreProfesional.trim().split(' ')[0];
        setUsuarioActivo({ primerNombre, ruta: '/citas' });
        return;
      }

      setUsuarioActivo(null);
    };

    verificarUsuario();

    // Escuchar cambios de sesión en Supabase y en localStorage
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      verificarUsuario();
    });
    window.addEventListener('app-session-change', verificarUsuario);
    window.addEventListener('storage', verificarUsuario);

    return () => {
      authListener.subscription.unsubscribe();
      window.removeEventListener('app-session-change', verificarUsuario);
      window.removeEventListener('storage', verificarUsuario);
    };
  }, []);

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
            <img src={Logo} alt="Logo" />
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

        {/* ACCIONES DERECHA */}
        <div className="reh-actions-pill">
          {usuarioActivo ? (
            <NavLink
              to={usuarioActivo.ruta}
              className="reh-btn-register"
              onClick={() => setMenuAbierto(false)}
            >
              {usuarioActivo.primerNombre}
            </NavLink>
          ) : (
            <>
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
            </>
          )}
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
          {usuarioActivo ? (
            <NavLink
              to={usuarioActivo.ruta}
              className="reh-btn-register mobile"
              onClick={() => setMenuAbierto(false)}
            >
              {usuarioActivo.primerNombre}
            </NavLink>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}