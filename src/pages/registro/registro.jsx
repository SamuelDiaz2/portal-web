import { supabase } from '../../lib/supabase';
import { useState } from 'react';
import './registro.css'; // Reutilizamos estilos de login

function Registro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [rol, setRol] = useState('paciente');
    const [servicio, setServicio] = useState('Fisioterapia'); // Nuevo campo
    const [direccion, setDireccion] = useState(''); // Nuevo campo

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nombre_completo: nombre,
                    rol: rol,
                    servicio: servicio,
                    direccion: direccion
                }
            }
        });

        if (error) {
            console.log(error.message);
            alert("Error: " + error.message);
        } else {

            const servicioAdquirido = data.user.user_metadata.servicio || "Servicio no especificado";
            localStorage.setItem('servicioUsuario', servicioAdquirido); // Guardar el servicio en localStorage para mostrarlo en Inicio

            console.log('usuario registrado');
            alert("¡Registro exitoso! Revisa tu correo de confirmación.");
        }
    };

    return (
        <div className="login-container"> {/* Contenedor para centrado vertical */}
            <form onSubmit={handleSignUp} className="login-form">
                <h2 className="form-title">Crear Cuenta</h2>
                
                <input type="text" placeholder="Nombre Completo" required onChange={(e) => setNombre(e.target.value)} />
                <input type="email" placeholder="Correo" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" required onChange={(e) => setPassword(e.target.value)} />
                
                {/* Nuevo campo: Dirección */}
                <input type="text" placeholder="Dirección de residencia" required onChange={(e) => setDireccion(e.target.value)} />

                {/* Selección de Rol */}
                <select onChange={(e) => setRol(e.target.value)} className="select-pill">
                    <option value="paciente">Soy Paciente</option>
                    <option value="fisioterapeuta">Soy Fisioterapeuta</option>
                </select>

                {/* Nuevo campo: Servicio de interés */}
                <select onChange={(e) => setServicio(e.target.value)} className="select-pill">
                    <option value="Fisioterapia">Fisioterapia</option>
                    <option value="Rehabilitación">Rehabilitación</option>
                    <option value="Masaje Terapéutico">Masaje Terapéutico</option>
                </select>

                <button type="submit" className="btn-registro">Registrarse</button>
            </form>
        </div>
    );
}

export default Registro;