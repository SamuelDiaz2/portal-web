import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react"; // 1. Importamos hooks
import './dashboard.css';

function Dashboard() {
    // 2. Definimos el estado para las citas
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);

    const nombre = localStorage.getItem('nombreUsuario') || "Paciente"; // Usa el mismo nombre que guardamos en Login
    const servicioInteres = localStorage.getItem('servicioUsuario') || "Salud";

    // 3. Función para cargar datos
    async function fetchCitas() {
        setLoading(true);
        const { data, error } = await supabase
            .from('citas')
            .select('*')
            .eq('nombre_paciente', nombre) // Filtramos por el nombre del paciente
            .order('fecha', { ascending: true }); // Ordenar por fecha


        if (error) {
            console.error("Error al cargar citas:", error);
        } else {
            setCitas(data); // 4. Guardamos los datos en el estado
        }
        setLoading(false);
    }

    // 5. Llamamos a la función al montar el componente
    useEffect(() => {
        fetchCitas();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Bienvenido, {nombre}</h1>
                <p>Gestiona tus servicios de {servicioInteres} y consulta tus horarios.</p>
            </div>
            
            <div className="citas-section">
                <h2>Próximas Citas</h2>
                
                {loading ? (
                    <p>Cargando tus citas...</p>
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