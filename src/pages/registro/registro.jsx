import { supabase } from '../../lib/supabase';
import { useState } from 'react';
import './registro.css'; // Reutilizamos estilos de login

function Registro() {
    const [nombre, setNombre] = useState('');
    const [identificacion, setIdentificacion] = useState('C.C');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [edad, setEdad] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [barrioLocalidad, setBarrioLocalidad] = useState('');
    const [municipioCiudad, setMunicipioCiudad] = useState('');
    const [email, setEmail] = useState('');
    const [nombreAcudiente, setNombreAcudiente] = useState('');
    const [password, setPassword] = useState('');
    const [servicio, setServicio] = useState('Terapia Física');
    const [modalidad, setModalidad] = useState('30 minutos');



    const handleSignUp = async (e) => {
        e.preventDefault();
        
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nombre_completo: nombre,
                    identificacion: identificacion,
                    numero_identificacion: numeroIdentificacion,
                    edad: edad,
                    diagnostico: diagnostico,
                    telefono: telefono,
                    direccion: direccion,
                    barrio_localidad: barrioLocalidad,
                    municipio_ciudad: municipioCiudad,
                    nombre_acudiente: nombreAcudiente,
                    servicio: servicio,
                    modalidad: modalidad
                }
            }
        });

        if (error) {
            console.log(error.message);
            alert("Error: " + error.message);
        } else {

            console.log('usuario registrado');
            alert("¡Registro exitoso! Revisa tu correo de confirmación.");
        }
    };

    return (
        <div className="register-container"> {/* Contenedor para centrado vertical */}
            <form onSubmit={handleSignUp} className="login-form">
                <h2 className="form-title">Crear Paciente</h2>
                
                <input type="text" placeholder="Nombre Completo" required onChange={(e) => setNombre(e.target.value)} />
                <select onChange={(e) => setIdentificacion(e.target.value)} className="select-pill">
                    <option value="C.C">C.C</option>
                    <option value="T.I">T.I</option>
                    <option value="C.E">C.E</option>
                    <option value="R.C">R.C</option>
                </select>
                
                {/* Campos adicionales para información del paciente */}
                <input type="number" placeholder='Número Identificacion' required onChange={(e) => setNumeroIdentificacion(e.target.value)} />
                <input type="number" placeholder='Edad' required onChange={(e) => setEdad(e.target.value)} />
                <input type="text" placeholder='Diagnóstico' required onChange={(e) => setDiagnostico(e.target.value)} />
                <input type="number" placeholder='Número Telefono' required onChange={(e) => setTelefono(e.target.value)} />
                <input type="text" placeholder="Dirección de residencia" required onChange={(e) => setDireccion(e.target.value)} />
                <input type="text" placeholder='Barrio o Localidad' required onChange={(e) => setBarrioLocalidad(e.target.value)} />
                <input type="text" placeholder='Municipio o Ciudad' required onChange={(e) => setMunicipioCiudad(e.target.value)} />
                <input type="text" placeholder='Nombre Acudiente, Familiar o Cuidador' required onChange={(e) => setNombreAcudiente(e.target.value)} />

                <select onChange={(e) => setServicio(e.target.value)} className="select-pill">
                    <option value="Psicologia">Psicología</option>
                    <option value="Hidroterapia">Hidroterapia</option>
                    <option value="Terapia Fisica">Terapia Fisica</option>
                    <option value="Terapia Respiratoria">Terapia Respiratoria</option>
                    <option value="Terapia Ocupacional">Terapia Ocupacional</option>
                    <option value="Terapia Fonoaudiologia">Terapia Fonoaudiologia</option>
                </select>

                <select onChange={(e) => setModalidad(e.target.value)} className="select-pill">
                    <option value="30-minutos">30 minutos</option>
                    <option value="50-minutos">50 minutos</option>
                </select>

                <hr />

                <input type="email" placeholder="Correo" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" required onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="btn-registro">Registrarse</button>
            </form>
        </div>
    );
}

export default Registro;