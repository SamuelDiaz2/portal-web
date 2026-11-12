import { supabase } from "../../lib/supabase.js";
import { useState, useEffect, useCallback } from "react";
import './dashboard.css';
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelingId, setCancelingId] = useState(null);
    const [userProfile, setUserProfile] = useState({
        nombre: "Paciente",
        servicioInteres: "nuestros servicios",
        numeroidentificacion: ""
    });

    const fetchAllData = useCallback(async () => {
        setLoading(true);
        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                navigate('/login');
                return;
            }

            // Consultamos perfil en public.perfiles
            const { data: profile } = await supabase
                .from('perfiles')
                .select('*')
                .eq('id', user.id)
                .single();

            const nombre = profile?.nombre_completo || user.user_metadata?.nombre_completo || "Paciente";
            const servicio = profile?.servicio_principal || user.user_metadata?.servicio || "nuestros servicios";
            const id = profile?.numero_identificacion || user.user_metadata?.numero_identificacion || "";

            setUserProfile({ nombre, servicioInteres: servicio, numeroidentificacion: id });

            // Consultamos citas vinculadas por user_id
            const { data: citasData, error: citasError } = await supabase
                .from('citas')
                .select('*')
                .eq('user_id', user.id)
                .order('fecha', { ascending: false })
                .order('hora', { ascending: false });

            if (citasError) {
                console.error("Error al obtener citas:", citasError);
            } else {
                setCitas(citasData || []);
            }
        } catch (err) {
            console.error("Error en dashboard:", err);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const handleCancelarCita = async (citaId) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas cancelar esta cita médica?");
        if (!confirmar) return;

        setCancelingId(citaId);
        try {
            const { error } = await supabase
                .from('citas')
                .update({ estado: 'cancelada' })
                .eq('id', citaId);

            if (error) {
                alert("Error al cancelar la cita: " + error.message);
            } else {
                alert("La cita ha sido cancelada exitosamente.");
                fetchAllData();
            }
        } catch (err) {
            console.error("Error al cancelar cita:", err);
            alert("No se pudo procesar la cancelación.");
        } finally {
            setCancelingId(null);
        }
    };

    // Separar la próxima cita activa de las demás
    const citasActivas = citas.filter(c => c.estado !== 'cancelada' && c.estado !== 'completada');
    const proximaCita = citasActivas.length > 0 ? citasActivas[citasActivas.length - 1] : null;

    const getStatusClass = (estado) => {
        switch (estado?.toLowerCase()) {
            case 'confirmada': return 'status-confirmada';
            case 'cancelada': return 'status-cancelada';
            case 'completada': return 'status-completada';
            default: return 'status-pendiente';
        }
    };

    return (
        <div className="dashboard-container">
            <header className="top-nav">
                <div className="profile-badge">
                    <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.nombre)}&background=7fb5e8&color=ffffff&bold=true`}
                        alt="avatar"
                        className="avatar-img"
                    />
                    <span className="user-name-text">{userProfile.nombre.split(' ')[0]}</span>
                </div>
            </header>

            <main className="dashboard-content">
                <div className="welcome-section">
                    <h1 className="welcome-title">¡BIENVENIDO!</h1>
                    <h2 className="user-name">{userProfile.nombre.toUpperCase()}</h2>

                    <div className="action-buttons">
                        <Link to="/agendar" className="btn-primary">
                            <span className="icon">📅</span> AGENDAR NUEVA CITA
                        </Link>
                    </div>
                </div>

                {/* Sección Próxima Cita */}
                <div className="citas-section">
                    <h3 className="section-title">PRÓXIMA CITA ACTIVA</h3>

                    {loading ? (
                        <div className="loader">Cargando tus citas...</div>
                    ) : proximaCita ? (
                        <div className="cita-card">
                            <div className="card-header">
                                <p><strong>PACIENTE:</strong> {proximaCita.nombre_paciente?.toUpperCase()}</p>
                                <span className={`status-pill ${getStatusClass(proximaCita.estado)}`}>
                                    {proximaCita.estado?.toUpperCase() || 'PENDIENTE'}
                                </span>
                            </div>
                            <div className="card-body">
                                <div className="detail-item">
                                    <span>📅 <strong>FECHA:</strong> {proximaCita.fecha}</span>
                                </div>
                                <div className="detail-item">
                                    <span>⏰ <strong>HORA:</strong> {proximaCita.hora}</span>
                                </div>
                                <div className="detail-item">
                                    <span>⚕️ <strong>SERVICIO:</strong> {proximaCita.servicio}</span>
                                </div>
                                <div className="detail-item">
                                    <span>📋 <strong>MODALIDAD:</strong> {proximaCita.modalidad || 'Presencial'}</span>
                                </div>
                                <div className="detail-item">
                                    <span>👨‍⚕️ <strong>PROFESIONAL:</strong> {proximaCita.profesional || 'Por asignar'}</span>
                                </div>
                                {proximaCita.motivo_consulta && (
                                    <div className="detail-item">
                                        <span>📝 <strong>MOTIVO:</strong> {proximaCita.motivo_consulta}</span>
                                    </div>
                                )}
                            </div>

                            {proximaCita.estado === 'pendiente' && (
                                <div className="card-footer">
                                    <button
                                        className="btn-cancelar"
                                        onClick={() => handleCancelarCita(proximaCita.id)}
                                        disabled={cancelingId === proximaCita.id}
                                    >
                                        {cancelingId === proximaCita.id ? 'Cancelando...' : 'Cancelar Cita'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="no-citas">No tienes citas activas próximas en este momento.</p>
                    )}
                </div>

                {/* Historial de Citas */}
                {!loading && citas.length > 1 && (
                    <div className="historial-section">
                        <h3 className="section-title">HISTORIAL DE CITAS</h3>
                        <div className="historial-grid">
                            {citas.map((cita) => (
                                <div key={cita.id} className="historial-item">
                                    <div className="historial-info">
                                        <h4>{cita.servicio}</h4>
                                        <p className="historial-meta">
                                            <span>📅 {cita.fecha}</span> • <span>⏰ {cita.hora}</span>
                                        </p>
                                    </div>
                                    <div className="historial-actions">
                                        <span className={`status-pill ${getStatusClass(cita.estado)}`}>
                                            {cita.estado?.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;