import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Intentar iniciar sesión en Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error al iniciar sesión: " + error.message);
    } else {

      const nombreUsuario = data.user.user_metadata.nombre_completo || "Usuario";   
      localStorage.setItem('nombreUsuario', nombreUsuario); // Guardar el nombre en localStorage para mostrarlo en Inicio


      console.log("Usuario logueado:", data.user);
      window.location.hash = '/dashboard'; // Redirige a la página principal tras el éxito
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Portal de Pacientes</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>

        <div className="login-footer">
          <span>¿No tienes cuenta? </span>
          <Link to="/registro" className="register-link">Registrarse</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;