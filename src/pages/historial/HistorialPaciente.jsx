import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './historialPaciente.css';

const ETIQUETAS_CONOCIDAS = {
    hora_inicial: 'Hora inicial',
    hora_final: 'Hora final',
    evolucion: 'Evolución',
    observaciones_clinicas: 'Observaciones clínicas',
    cumplimiento: 'Cumplimiento',
    compromiso: 'Compromiso',
    motivo_consulta: 'Motivo de consulta',
    diagnostico: 'Diagnóstico',
    plan_tratamiento: 'Plan de tratamiento',
    objetivos: 'Objetivos',
    antecedentes: 'Antecedentes',
    signos_vitales: 'Signos vitales',
};

const formatearEtiqueta = (clave = '') => {
    if (ETIQUETAS_CONOCIDAS[clave]) return ETIQUETAS_CONOCIDAS[clave];
    const texto = clave.replace(/_/g, ' ').trim();
    return texto.charAt(0).toUpperCase() + texto.slice(1);
};

const formatearFechaCorta = (fecha) => {
    if (!fecha) return 'Sin fecha';
    return new Date(fecha).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const formatearFechaCompleta = (fecha) => {
    if (!fecha) return 'Fecha no disponible';
    return new Date(fecha).toLocaleString('es-CO', {
        dateStyle: 'long',
        timeStyle: 'short',
    });
};

const parsearFormulario = (rawDatos) => {
    if (!rawDatos) return {};
    if (typeof rawDatos === 'string') {
        try {
            return JSON.parse(rawDatos);
        } catch {
            return {};
        }
    }
    return rawDatos;
};

export default function HistorialPaciente() {
    const [pacienteInfo, setPacienteInfo] = useState(null);
    const [registros, setRegistros] = useState([]);
    const [indiceActivo, setIndiceActivo] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let activo = true;

        const cargarHistorial = async () => {
            try {
                setCargando(true);
                setError(null);

                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError) throw userError;
                if (!user) {
                    throw new Error('Debes iniciar sesión para ver tu historial.');
                }

                const numeroIdentificacion =
                    user.user_metadata?.numero_identificacion || '';
                const nombreFallback =
                    user.user_metadata?.nombre_completo || 'Paciente';

                if (!numeroIdentificacion) {
                    if (activo) {
                        setPacienteInfo({
                            nombre: nombreFallback,
                            identificacion: 'No registrada',
                        });
                        setRegistros([]);
                    }
                    return;
                }

                // 1. Buscar el registro del paciente por su identificación
                const { data: pacienteDB, error: pacError } = await supabase
                    .from('pacientes')
                    .select('id, nombre_completo, numero_identificacion')
                    .eq('numero_identificacion', numeroIdentificacion)
                    .limit(1)
                    .maybeSingle();

                if (pacError) throw pacError;

                if (!pacienteDB) {
                    if (activo) {
                        setPacienteInfo({
                            nombre: nombreFallback,
                            identificacion: numeroIdentificacion,
                        });
                        setRegistros([]);
                    }
                    return;
                }

                // 2. Traer todas las evoluciones en orden cronológico
                const { data: evoluciones, error: evoError } = await supabase
                    .from('evoluciones_atencion')
                    .select('*')
                    .eq('paciente_id', pacienteDB.id)
                    .order('created_at', { ascending: true });

                if (evoError) throw evoError;

                if (activo) {
                    const lista = evoluciones || [];
                    setPacienteInfo({
                        id: pacienteDB.id,
                        nombre: pacienteDB.nombre_completo || nombreFallback,
                        identificacion:
                            pacienteDB.numero_identificacion || numeroIdentificacion,
                    });
                    setRegistros(lista);
                    setIndiceActivo(lista.length > 0 ? lista.length - 1 : 0);
                }
            } catch (err) {
                console.error('Error al cargar historial clínico:', err);
                if (activo) {
                    setError(
                        err.message || 'No se pudo cargar tu historial clínico.'
                    );
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        };

        cargarHistorial();

        return () => {
            activo = false;
        };
    }, []);

    const registroSeleccionado = registros[indiceActivo] || null;

    const { camposFormulario, firmaPaciente } = useMemo(() => {
        if (!registroSeleccionado) {
            return { camposFormulario: [], firmaPaciente: null };
        }

        const respuestas = parsearFormulario(registroSeleccionado.datos_formulario);
        const firma =
            typeof respuestas.firma_paciente === 'string' &&
                respuestas.firma_paciente.startsWith('data:image/')
                ? respuestas.firma_paciente
                : null;

        const campos = Object.entries(respuestas)
            .filter(([clave, valor]) => {
                if (clave === 'firma_paciente') return false;
                if (valor === undefined || valor === null) return false;
                if (typeof valor === 'string' && valor.trim() === '') return false;
                if (Array.isArray(valor) && valor.length === 0) return false;
                return true;
            })
            .map(([clave, valor]) => ({
                id: clave,
                label: formatearEtiqueta(clave),
                valor: Array.isArray(valor)
                    ? valor.join(', ')
                    : typeof valor === 'object'
                        ? JSON.stringify(valor)
                        : String(valor),
            }));

        return { camposFormulario: campos, firmaPaciente: firma };
    }, [registroSeleccionado]);

    return (
        <div className="hp-page-container">
            <div className="hp-content">
                <div className="hp-top-bar">
                    <Link to="/dashboard" className="hp-btn-volver">
                        ← Volver al inicio
                    </Link>
                </div>

                <header className="hp-header">
                    <div>
                        <h1 className="hp-title">Mi Historial Clínico</h1>
                        <p className="hp-subtitle">
                            Selecciona un punto en la línea de tiempo para ver el detalle de cada sesión
                        </p>
                    </div>

                    {pacienteInfo && (
                        <div className="hp-patient-pill">
                            <span className="hp-patient-name">{pacienteInfo.nombre}</span>
                            <span className="hp-patient-doc">
                                Doc: {pacienteInfo.identificacion}
                            </span>
                        </div>
                    )}
                </header>

                {cargando ? (
                    <div className="hp-state-card">
                        <div className="hp-spinner" />
                        <p>Cargando tu línea de tiempo clínica...</p>
                    </div>
                ) : error ? (
                    <div className="hp-state-card error">
                        <p>{error}</p>
                        <button
                            type="button"
                            className="hp-btn-reintentar"
                            onClick={() => window.location.reload()}
                        >
                            Reintentar
                        </button>
                    </div>
                ) : registros.length === 0 ? (
                    <div className="hp-state-card">
                        <h3>Aún no tienes evoluciones registradas</h3>
                        <p>
                            Cuando asistas a tu evaluación inicial o sesiones de terapia, aparecerán aquí en tu línea de tiempo.
                        </p>
                        <Link to="/agendar" className="hp-btn-agendar">
                            Agendar una cita →
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* LÍNEA DE TIEMPO INTERACTIVA POR PUNTOS */}
                        <section className="hp-timeline-card">
                            <div className="hp-timeline-meta">
                                <span>Línea de tiempo de atenciones</span>
                                <strong>
                                    Sesión {indiceActivo + 1} de {registros.length}
                                </strong>
                            </div>

                            <div className="hp-timeline-scroll">
                                <div className="hp-timeline-track">
                                    {registros.map((reg, idx) => {
                                        const esInicial =
                                            reg.tipo_registro === 'evaluacion_inicial';
                                        const activo = idx === indiceActivo;
                                        const completado = idx < indiceActivo;

                                        return (
                                            <button
                                                key={reg.id || idx}
                                                type="button"
                                                onClick={() => setIndiceActivo(idx)}
                                                className={[
                                                    'hp-node-btn',
                                                    activo ? 'activo' : '',
                                                    completado ? 'pasado' : '',
                                                    esInicial ? 'inicial' : '',
                                                ]
                                                    .filter(Boolean)
                                                    .join(' ')}
                                            >
                                                {idx < registros.length - 1 && (
                                                    <span
                                                        className={`hp-connector ${idx < indiceActivo ? 'llena' : ''
                                                            }`}
                                                    />
                                                )}

                                                <span className="hp-dot">
                                                    <span>{idx + 1}</span>
                                                </span>

                                                <span className="hp-node-tipo">
                                                    {esInicial
                                                        ? 'Eval. Inicial'
                                                        : `Evolución #${idx}`}
                                                </span>
                                                <span className="hp-node-fecha">
                                                    {formatearFechaCorta(reg.created_at)}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>

                        {/* DETALLE DEL REGISTRO SELECCIONADO */}
                        {registroSeleccionado && (
                            <article
                                key={registroSeleccionado.id || indiceActivo}
                                className="hp-detail-card"
                            >
                                <div className="hp-detail-banner">
                                    <div>
                                        <span className="hp-detail-tag">
                                            {registroSeleccionado.profesion_especialidad ||
                                                'Atención Clínica'}
                                        </span>
                                        <h2>
                                            {registroSeleccionado.tipo_registro ===
                                                'evaluacion_inicial'
                                                ? 'Evaluación Inicial'
                                                : `Evolución de Seguimiento #${indiceActivo}`}
                                        </h2>
                                    </div>

                                    <span className="hp-detail-date">
                                        {formatearFechaCompleta(
                                            registroSeleccionado.created_at
                                        )}
                                    </span>
                                </div>

                                <div className="hp-prof-grid">
                                    <div className="hp-prof-item">
                                        <span>Profesional que atendió</span>
                                        <strong>
                                            {registroSeleccionado.profesional_nombre ||
                                                'No disponible'}
                                        </strong>
                                    </div>
                                    <div className="hp-prof-item">
                                        <span>Registro / Cédula</span>
                                        <strong>
                                            {registroSeleccionado.profesional_cedula ||
                                                'No disponible'}
                                        </strong>
                                    </div>
                                </div>

                                <div className="hp-sections-list">
                                    {camposFormulario.length > 0 ? (
                                        <div className="hp-fields-grid">
                                            {camposFormulario.map((campo) => (
                                                <div
                                                    key={campo.id}
                                                    className="hp-field-box"
                                                >
                                                    <span className="hp-field-label">
                                                        {campo.label}
                                                    </span>
                                                    <p className="hp-field-value">
                                                        {campo.valor}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="hp-empty-fields">
                                            Esta sesión no tiene observaciones detalladas registradas.
                                        </p>
                                    )}
                                </div>

                                {firmaPaciente && (
                                    <div className="hp-firma-box">
                                        <span>Firma del paciente</span>
                                        <img
                                            src={firmaPaciente}
                                            alt="Firma del paciente"
                                        />
                                    </div>
                                )}

                                <div className="hp-detail-footer">
                                    <button
                                        type="button"
                                        className="hp-nav-step"
                                        disabled={indiceActivo === 0}
                                        onClick={() =>
                                            setIndiceActivo((prev) => Math.max(0, prev - 1))
                                        }
                                    >
                                        ← Sesión anterior
                                    </button>

                                    <button
                                        type="button"
                                        className="hp-nav-step"
                                        disabled={indiceActivo === registros.length - 1}
                                        onClick={() =>
                                            setIndiceActivo((prev) =>
                                                Math.min(registros.length - 1, prev + 1)
                                            )
                                        }
                                    >
                                        Siguiente sesión →
                                    </button>
                                </div>
                            </article>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}