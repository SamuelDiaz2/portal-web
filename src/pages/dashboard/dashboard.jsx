import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import './dashboard.css';
import { Link } from "react-router-dom";

function Dashboard() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({
        nombre: "Paciente",
        servicioInteres: "nuestros servicios",
        numeroidentificacion: ""
    });

    async function fetchAllData() {
        setLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (user) {
            const nombre = user.user_metadata?.nombre_completo || "Paciente";
            const servicio = user.user_metadata?.servicio_interes || "nuestros servicios";
            const id = user.user_metadata?.numero_identificacion || "";

            setUserProfile({ nombre, servicioInteres: servicio, numeroidentificacion: id });

            const { data, error: citasError } = await supabase
                .from('citas')
                .select('*')
                .eq('identificacion', id)
                .order('fecha', { ascending: true })
                .order('hora', { ascending: true });

            if (!citasError) setCitas(data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <div className="dashboard-container">
            
            <header className="top-nav">
                <div className="profile-badge">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${userProfile.nombre}&background=random`} 
                        alt="avatar" 
                        className="avatar-img"
                    />
                    <span className="user-name-text">{userProfile.nombre.split(' ')[0]}</span>
                    <button className="settings-icon">⚙️</button>
                </div>
            </header>

            <main className="dashboard-content">
                <div className="welcome-section">
                    <h1 className="welcome-title">¡BIENVENIDO!</h1>
                    <h2 className="user-name">{userProfile.nombre.toUpperCase()}</h2>
                    

                    <div className="action-buttons">
                        <button className="btn-primary">
                            <Link to="/agendar" className="link-button">
                                <span className="icon">📅</span> AGENDAR CITA
                            </Link>
                        </button>
                        <button className="btn-secondary">
                            <span className="icon">📋</span> HISTORIA CLÍNICA
                        </button>
                    </div>
                </div>

                <div className="citas-section">
                    <h3 className="section-title">PRÓXIMA CITA</h3>
                    
                    {loading ? (
                        <div className="loader">Cargando datos...</div>
                    ) : citas.length > 0 ? (
                        <div className="citas-grid">
                            
                            {citas.slice(0, 1).map((cita) => (
                                <div key={cita.id} className="cita-card">
                                    <div className="card-header">
                                        <p><strong>PACIENTE:</strong> {cita.nombre_paciente.toUpperCase()}</p>
                                        <span className="status-pill">{cita.estado || 'PENDIENTE'}</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="detail-item">
                                            <span>📅 FECHA: {cita.fecha}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span>⏰ HORA: {cita.hora}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span>⚕️ SERVICIO: {cita.servicio}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span>👨‍⚕️ PROFESIONAL: {cita.profesional || 'Por asignar'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-citas">No tienes citas agendadas actualmente.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;