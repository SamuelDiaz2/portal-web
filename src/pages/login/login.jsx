import './login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <h1 className="login-title">Portal de Pacientes</h1>
        <form className="login-form">
            <input type="text" placeholder="Usuario" className="login-input" />
            <input type="password" placeholder="Contraseña" className="login-input" />
            <button className="register-button"><Link to="/registro">Registrarse</Link></button>
        </form>
    </div>
  );
}

export default Login;