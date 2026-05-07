import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import './dashboard.css';

function Dashboard() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1. Creamos un estado para el perfil del usuario
    const [userProfile, setUserProfile] = useState({
        nombre: "Paciente",
        servicioInteres: "nuestros servicios",
        numeroidentificacion: ""
    });

    // 2. Función para obtener datos (mejorada)
    async function fetchAllData() {
        setLoading(true);
        
        // Obtenemos el usuario de la sesión
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (user) {
            const nombre = user.user_metadata?.nombre_completo || "Paciente";
            const servicio = user.user_metadata?.servicio_interes || "nuestros servicios";
            const id = user.user_metadata?.numero_identificacion || "";

            // Guardamos el perfil en el estado
            setUserProfile({ nombre, servicioInteres: servicio, numeroidentificacion: id });

            // Ahora cargamos las citas usando ese ID
            const { data, error: citasError } = await supabase
                .from('citas')
                .select('*')
                .eq('identificacion', id)
                .order('fecha', { ascending: true });

            if (!citasError) setCitas(data);
        }
        
        setLoading(false);
    }

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                {/* 3. Usamos los datos del estado userProfile */}
                <h1>Bienvenido, {userProfile.nombre}</h1>
                <p>Gestiona tus servicios de {userProfile.servicioInteres} y consulta tus horarios.</p>
            </div>
            
            <div className="citas-section">
                <h2>Próximas Citas</h2>
                {loading ? (
                    <p>Cargando datos...</p>
                ) : citas.length > 0 ? (
                    <div className="citas-grid">
                        {citas.map((cita) => (
                            <div key={cita.id} className="cita-card">
                                <div className="cita-info">
                                    <h3>{cita.servicio}</h3>
                                    <p><strong>Paciente:</strong> {cita.nombre_paciente}</p>
                                    <div className="cita-date">
                                        <span>📅 {cita.fecha}</span>
                                        <span>⏰ {cita.hora}</span>
                                    </div>
                                </div>
                                <span className="status-badge">{cita.estado || 'Pendiente'}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-citas">No tienes citas agendadas actualmente.</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;