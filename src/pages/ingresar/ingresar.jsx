import { useEffect, useState } from 'react';
import './ingresar.css';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase.js';

function Ingresar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verificar si el usuario está logueado
        const checkSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            // Si no hay usuario, redirigir al login
            if (!user) {
                navigate('/ingresar');
            }
        };

        checkSession();

        // Suscribirse a cambios en la sesión (login/logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

    return (
        <section className="ingresar-container">
            <div className="Profesional">
                <button>
                    <Link to="/apk">
                        <img src="../../src/assets/img/doctor.png" alt="Profesional" />
                    </Link>
                </button>
                <h2>Profesional</h2>
            </div>
            <div className="Paciente">
                <button><Link to={user ? "/dashboard" : "/login"}>
                    <img src="../../src/assets/img/paciente.png" alt="Paciente" />
                </Link></button>
                <h2>Paciente</h2>
            </div>
        </section>
    );
}

export default Ingresar;