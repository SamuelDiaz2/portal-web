import { supabase } from '../lib/supabase'; // Tu archivo de conexión
import { useState } from 'react';
import './login/login.css'; // Reutilizamos estilos de login

function Registro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [rol, setRol] = useState('paciente'); // Por defecto paciente

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nombre_completo: nombre,
                    rol: rol
                }
            }
        });

        if (error) alert(error.message);
        else alert('usuario registrado');
    };

    return (
        <form onSubmit={handleSignUp} className="login-form">
            <input type="text" placeholder="Nombre Completo" onChange={(e) => setNombre(e.target.value)} />
            <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            <select onChange={(e) => setRol(e.target.value)}>
                <option value="paciente">Soy Paciente</option>
                <option value="fisioterapeuta">Soy Fisioterapeuta</option>
            </select>
            <button type="submit">Registrarse</button>
        </form>
    );
}

export default Registro;