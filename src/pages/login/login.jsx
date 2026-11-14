import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase.js';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Si ya hay sesión activa, ir directo al dashboard
  useEffect(() => {
    const verificarSesion = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate('/dashboard', { replace: true });
      }
    };
    verificarSesion();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ texto: '', tipo: '' });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMensaje({ texto: 'El correo o contraseña son incorrectos', tipo: 'error' });
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Portal de Pacientes</h1>
      <form className="login-form" onSubmit={handleLogin}>
        {mensaje.texto && (
          <div className={mensaje.tipo === 'error' ? 'login-error' : 'login-success'}>
            <p>{mensaje.texto}</p>
          </div>
        )}

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