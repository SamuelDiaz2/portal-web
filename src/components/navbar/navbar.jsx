import './navbar.css';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar-container">

        <div className="logo-tab-container">
          

          <div className="nav-links-group side-left">
            <NavLink to="/inicio" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="dot"></span> INICIO 
            </NavLink>
          </div>


          <div className="logo-pill">
            <span className="logo-text">REHABILITAR-C</span>
          </div>

          <div className="nav-links-group side-right">
            <NavLink to="/ingresar" className="nav-button-green">
              INGRESAR
            </NavLink>
          </div>

          <div className="nav-links-group side-right">
            <NavLink to="/registro" className="nav-button-blue">
              REGISTRARSE
            </NavLink>
          </div>

        </div>
    </nav>
  );
}