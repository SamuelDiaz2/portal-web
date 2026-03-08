import './navbar.css';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar-container">
        {/* Pestaña Central Expansible (Rekorder Style) */}
        <div className="logo-tab-container">
          
          {/* Grupo de enlaces Izquierdo (inicialmente oculto) */}
          <div className="nav-links-group side-left">
            <NavLink to="/inicio" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="dot"></span> INICIO 
            </NavLink>
          </div>

          {/* El Logo Central */}
          <div className="logo-pill">
            <span className="logo-text">REHABILITAR-C</span>
          </div>

          {/* Grupo de enlaces Derecho (inicialmente oculto) */}
          <div className="nav-links-group side-right">
            <NavLink to="/ingresar" className="nav-button-green">
              INGRESAR
            </NavLink>
          </div>

        </div>
    </nav>
  );
}