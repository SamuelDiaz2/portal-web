
import './navbar.css';

import Login from '../pages/login.jsx';

import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';

export default function Navbar() {
    return (
    <Router>
    <>
        <nav className="navbar">
            <div className="navbar-logo">Portal de Pacientes</div>
            <ul className="navbar-links">
                <li><Link to={'/Login'}>Iniciar Sesión</Link></li>
            </ul>
        </nav>
    

        <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Agendar" element={<Agendar />}/>
        </Routes>
    </>
    </Router>
    );
} 