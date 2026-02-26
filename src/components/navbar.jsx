import './navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Rehabilitar - C</div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/ingresar">Ingresar</Link></li>
      </ul>
    </nav>
  );
}