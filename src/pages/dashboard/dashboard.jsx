import { supabase } from "../../lib/supabase";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import "./dashboard.css";

const MESES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const DIAS_SEMANA = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

const parsearFechaLocal = (fechaStr) => {
    if (!fechaStr) return null;
    const [anio, mes, dia] = fechaStr.split("-").map(Number);
    return new Date(anio, mes - 1, dia);
};

const formatearFechaClave = (anio, mes, dia) => {
    const m = String(mes + 1).padStart(2, "0");
    const d = String(dia).padStart(2, "0");
    return `${anio}-${m}-${d}`;
};

const formatearFechaLegible = (fechaStr) => {
    const fecha = parsearFechaLocal(fechaStr);
    if (!fecha) return fechaStr;
    return fecha.toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
};

function Dashboard() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({
        nombre: "Paciente",
        servicioInteres: "nuestros servicios",
        numeroidentificacion: "",
    });

    const hoy = useMemo(() => new Date(), []);
    const [mesActual, setMesActual] = useState(
        new Date(hoy.getFullYear(), hoy.getMonth(), 1)
    );
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

    async function fetchAllData() {
        setLoading(true);
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            const nombre = user.user_metadata?.nombre_completo || "Paciente";
            const servicio =
                user.user_metadata?.servicio_interes || "nuestros servicios";
            const id = user.user_metadata?.numero_identificacion || "";

            setUserProfile({
                nombre,
                servicioInteres: servicio,
                numeroidentificacion: id,
            });

            const { data, error: citasError } = await supabase
                .from("citas")
                .select("*")
                .eq("identificacion", id)
                .order("fecha", { ascending: true })
                .order("hora", { ascending: true });

            if (!citasError && data) {
                setCitas(data);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchAllData();
    }, []);

    const citasPorFecha = useMemo(() => {
        const mapa = {};
        citas.forEach((cita) => {
            if (!cita.fecha) return;
            if (!mapa[cita.fecha]) mapa[cita.fecha] = [];
            mapa[cita.fecha].push(cita);
        });
        return mapa;
    }, [citas]);

    const citaDestacada = useMemo(() => {
        if (fechaSeleccionada && citasPorFecha[fechaSeleccionada]?.length) {
            return citasPorFecha[fechaSeleccionada][0];
        }
        if (citas.length === 0) return null;

        const hoyClave = formatearFechaClave(
            hoy.getFullYear(),
            hoy.getMonth(),
            hoy.getDate()
        );
        const proxima = citas.find((c) => c.fecha >= hoyClave);
        return proxima || citas[0];
    }, [citas, citasPorFecha, fechaSeleccionada, hoy]);

    const diasDelMes = useMemo(() => {
        const anio = mesActual.getFullYear();
        const mes = mesActual.getMonth();
        const primerDiaSemana = (new Date(anio, mes, 1).getDay() + 6) % 7;
        const totalDias = new Date(anio, mes + 1, 0).getDate();

        const celdas = [];
        for (let i = 0; i < primerDiaSemana; i++) {
            celdas.push(null);
        }
        for (let dia = 1; dia <= totalDias; dia++) {
            celdas.push({
                dia,
                clave: formatearFechaClave(anio, mes, dia),
            });
        }
        return celdas;
    }, [mesActual]);

    const cambiarMes = (delta) => {
        setMesActual(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
        );
    };

    const hoyClave = formatearFechaClave(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate()
    );

    return (
        <div className="dashboard-container">
            <main className="dashboard-content">
                <section className="welcome-section">
                    <h1 className="welcome-title">
                        Bienvenido, <span>{userProfile.nombre}</span>
                    </h1>
                    <p className="welcome-subtitle">¿Qué deseas hacer hoy?</p>
                </section>

                <section className="action-cards-grid">
                    <Link to="/agendar" className="action-card card-agendar">
                        <div className="action-card-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="3" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                                <line x1="12" y1="14" x2="12" y2="18" />
                                <line x1="10" y1="16" x2="14" y2="16" />
                            </svg>
                        </div>
                        <div className="action-card-info">
                            <h2>Agendar</h2>
                            <p>Programa tu próxima cita o sesión de terapia</p>
                        </div>
                        <span className="action-card-arrow">→</span>
                    </Link>

                    <Link to="/HistorialPaciente" className="action-card card-historial">
                        <div className="action-card-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="9" y1="13" x2="15" y2="13" />
                                <line x1="9" y1="17" x2="13" y2="17" />
                            </svg>
                        </div>
                        <div className="action-card-info">
                            <h2>Consultar Historial Clínico</h2>
                            <p>Revisa tus evaluaciones, evoluciones y registros</p>
                        </div>
                        <span className="action-card-arrow">→</span>
                    </Link>
                </section>

                <section className="bottom-dashboard-grid">
                    <div className="proxima-cita-panel">
                        <div className="panel-header-row">
                            <h3 className="section-title">
                                {fechaSeleccionada && citasPorFecha[fechaSeleccionada]
                                    ? "Cita del día seleccionado"
                                    : "Próxima cita"}
                            </h3>
                            {fechaSeleccionada && (
                                <button
                                    type="button"
                                    className="btn-ver-proxima"
                                    onClick={() => setFechaSeleccionada(null)}
                                >
                                    Ver próxima
                                </button>
                            )}
                        </div>

                        {loading ? (
                            <div className="cita-skeleton">
                                <div className="skeleton-line short" />
                                <div className="skeleton-line" />
                                <div className="skeleton-line" />
                            </div>
                        ) : citaDestacada ? (
                            <div className="cita-card-elegante">
                                <div className="cita-top-bar">
                                    <span className="cita-fecha-badge">
                                        {formatearFechaLegible(citaDestacada.fecha)}
                                    </span>
                                    <span
                                        className={`status-pill ${(
                                            citaDestacada.estado || "pendiente"
                                        ).toLowerCase()}`}
                                    >
                                        {citaDestacada.estado || "Pendiente"}
                                    </span>
                                </div>

                                <div className="cita-datos-principales">
                                    <div className="dato-destacado">
                                        <span className="dato-label">Hora</span>
                                        <strong className="dato-valor">
                                            {citaDestacada.hora || "Por definir"}
                                        </strong>
                                    </div>

                                    <div className="dato-destacado">
                                        <span className="dato-label">Paciente</span>
                                        <strong className="dato-valor">
                                            {citaDestacada.nombre_paciente}
                                        </strong>
                                    </div>
                                </div>

                                <div className="cita-detalles-extra">
                                    <div className="detalle-fila">
                                        <span>Servicio:</span>
                                        <strong>{citaDestacada.servicio || "General"}</strong>
                                    </div>
                                    <div className="detalle-fila">
                                        <span>Profesional:</span>
                                        <strong>
                                            {citaDestacada.profesional || "Por asignar"}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="no-citas-card">
                                <p>No tienes citas agendadas actualmente.</p>
                                <Link to="/agendar" className="link-agendar-ahora">
                                    Agendar mi primera cita →
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="calendario-panel">
                        <div className="calendario-header">
                            <span className="calendario-mes-titulo">
                                {MESES[mesActual.getMonth()]} {mesActual.getFullYear()}
                            </span>
                            <div className="calendario-nav-btns">
                                <button
                                    type="button"
                                    onClick={() => cambiarMes(-1)}
                                    aria-label="Mes anterior"
                                >
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    onClick={() => cambiarMes(1)}
                                    aria-label="Mes siguiente"
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        <div className="calendario-dias-semana">
                            {DIAS_SEMANA.map((dia) => (
                                <span key={dia}>{dia}</span>
                            ))}
                        </div>

                        <div className="calendario-grid">
                            {diasDelMes.map((celda, idx) => {
                                if (!celda) {
                                    return <span key={`empty-${idx}`} className="cal-dia vacio" />;
                                }

                                const tieneCita = Boolean(citasPorFecha[celda.clave]);
                                const esHoy = celda.clave === hoyClave;
                                const estaSeleccionado = celda.clave === fechaSeleccionada;

                                return (
                                    <button
                                        key={celda.clave}
                                        type="button"
                                        onClick={() =>
                                            setFechaSeleccionada(
                                                estaSeleccionado ? null : celda.clave
                                            )
                                        }
                                        className={[
                                            "cal-dia",
                                            esHoy ? "hoy" : "",
                                            tieneCita ? "con-cita" : "",
                                            estaSeleccionado ? "seleccionado" : "",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                    >
                                        <span>{celda.dia}</span>
                                        {tieneCita && <i className="cita-punto" />}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="calendario-leyenda">
                            <span>
                                <i className="leyenda-dot hoy" /> Hoy
                            </span>
                            <span>
                                <i className="leyenda-dot cita" /> Cita agendada
                            </span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;