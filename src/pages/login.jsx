import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <h1 className="login-title">Portal de Pacientes</h1>
        <form className="login-form">
            <input type="text" placeholder="Usuario" className="login-input" />
            <input type="password" placeholder="Contraseña" className="login-input" />
            <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
    </div>
  );
}

export default Login;