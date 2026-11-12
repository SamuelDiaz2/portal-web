import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase.js';
import './agendar.css';

const SERVICIOS_DISPONIBLES = [
  'Terapia Física',
  'Psicología',
  'Fonoaudiología',
  'Hidroterapia',
  'Terapia Respiratoria',
  'Terapia Ocupacional',
  'Valoración / Consulta General'
];

const MODALIDADES_DISPONIBLES = [
  'Presencial (30 min)',
  'Presencial (50 min)',
  'Virtual / Teleconsulta'
];

// Horarios entre semana (Lunes a Viernes)
const HORARIOS_ENTRE_SEMANA = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

// Horarios especiales para Sábado
const HORARIOS_SABADO = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'
];

// Obtener día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
function getDayOfWeek(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getDay();
}

// Obtener fecha inicial válida (si hoy es domingo, sugerir lunes)
function getInitialDate() {
  const d = new Date();
  if (d.getDay() === 0) {
    d.setDate(d.getDate() + 1);
  }
  return d.toISOString().split('T')[0];
}

function Agendar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState(null);

  const initialDateStr = getInitialDate();
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxDateObj = new Date();
  maxDateObj.setDate(maxDateObj.getDate() + 60);
  const maxDate = maxDateObj.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    telefono: '',
    direccion: '',
    servicio: 'Terapia Física',
    modalidad: 'Presencial (30 min)',
    fecha: initialDateStr,
    hora: '08:00',
  });

  // Determinar si la fecha seleccionada es sábado o entre semana
  const dayOfWeek = getDayOfWeek(formData.fecha);
  const isSaturday = dayOfWeek === 6;
  const horariosDisponibles = isSaturday ? HORARIOS_SABADO : HORARIOS_ENTRE_SEMANA;

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          navigate('/login');
          return;
        }

        setUser(user);

        // Consultamos la tabla perfiles
        const { data: profile } = await supabase
          .from('perfiles')
          .select('*')
          .eq('id', user.id)
          .single();

        const nombre = profile?.nombre_completo || user.user_metadata?.nombre_completo || '';
        const identificacion = profile?.numero_identificacion || user.user_metadata?.numero_identificacion || user.user_metadata?.identificacion || '';
        const telefono = profile?.telefono || user.user_metadata?.telefono || '';
        const direccion = profile?.direccion || user.user_metadata?.direccion || '';
        const servicio = profile?.servicio_principal || user.user_metadata?.servicio || 'Terapia Física';
        const modalidad = profile?.modalidad_preferida || user.user_metadata?.modalidad || 'Presencial (30 min)';

        setFormData(prev => ({
          ...prev,
          nombre,
          identificacion,
          telefono,
          direccion,
          servicio: SERVICIOS_DISPONIBLES.includes(servicio) ? servicio : SERVICIOS_DISPONIBLES[0],
          modalidad: MODALIDADES_DISPONIBLES.some(m => m.includes(modalidad)) ? modalidad : 'Presencial (30 min)',
          fecha: initialDateStr,
          hora: '08:00'
        }));
      } catch (err) {
        console.error('Error al cargar datos del usuario:', err);
      } finally {
        setInitialLoading(false);
      }
    }

    loadUserData();
  }, [navigate, initialDateStr]);

  // Manejo de cambio de fecha
  const handleDateChange = (newDate) => {
    if (!newDate) {
      setFormData(prev => ({ ...prev, fecha: '' }));
      return;
    }

    const selectedDay = getDayOfWeek(newDate);

    // 0 = Domingo
    if (selectedDay === 0) {
      alert('⚠️ Los domingos no hay atención médica. Por favor selecciona una fecha de lunes a sábado.');
      return;
    }

    // 6 = Sábado
    if (selectedDay === 6) {
      const newHora = HORARIOS_SABADO.includes(formData.hora) ? formData.hora : '08:00';
      setFormData(prev => ({ ...prev, fecha: newDate, hora: newHora }));
    } else {
      // Lunes a Viernes
      const newHora = HORARIOS_ENTRE_SEMANA.includes(formData.hora) ? formData.hora : '08:00';
      setFormData(prev => ({ ...prev, fecha: newDate, hora: newHora }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Debes iniciar sesión para agendar una cita.');
      navigate('/login');
      return;
    }

    if (!formData.fecha || !formData.hora) {
      alert('Por favor selecciona una fecha y una hora válidas.');
      return;
    }

    const selectedDay = getDayOfWeek(formData.fecha);
    if (selectedDay === 0) {
      alert('⚠️ No se pueden agendar citas los domingos.');
      return;
    }

    if (selectedDay === 6 && !HORARIOS_SABADO.includes(formData.hora)) {
      alert('⚠️ Para los sábados sólo están disponibles los horarios 08:00 y 13:00.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('citas')
        .insert([
          {
            user_id: user.id,
            nombre_paciente: formData.nombre,
            identificacion: formData.identificacion,
            telefono_contacto: formData.telefono,
            direccion_atencion: formData.direccion,
            servicio: formData.servicio,
            modalidad: formData.modalidad,
            fecha: formData.fecha,
            hora: formData.hora,
            profesional: 'Por asignar',
            estado: 'pendiente'
          }
        ])
        .select();

      if (error) {
        console.error('Error al insertar cita:', error);
        alert('Error al agendar la cita: ' + error.message);
      } else {
        alert('¡Cita agendada con éxito! La puedes visualizar en tu panel.');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Excepción al agendar:', err);
      alert('Ocurrió un error inesperado al procesar la cita.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="agendar-container">
        <div className="agendar-loading">
          <div className="spinner"></div>
          <p>Cargando información del paciente...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="agendar-container">
      <div className="form-card">
        <div className="form-header">
          <Link to="/dashboard" className="btn-back" title="Volver al panel">Volver</Link>
          <h2 className="form-title">Agendar Cita Médica</h2>
          <p className="form-subtitle">Selecciona el servicio, la modalidad y el horario que mejor te convenga.</p>
        </div>

        <form onSubmit={handleSubmit} className="agendar-form">
          <div className="row">
            <div className="input-group">
              <label>Paciente</label>
              <input
                type="text"
                id="nombre"
                readOnly
                value={formData.nombre}
                className="input-readonly"
              />
            </div>
            <div className="input-group">
              <label>Identificación</label>
              <input
                type="text"
                id="identificacion"
                readOnly
                value={formData.identificacion || 'No especificada'}
                className="input-readonly"
              />
            </div>
          </div>

          {/* Servicio */}
          <div className="input-group">
            <label htmlFor="servicio">Servicio / Especialidad Requerida</label>
            <select
              id="servicio"
              value={formData.servicio}
              onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
              className="select-field"
              required
            >
              {SERVICIOS_DISPONIBLES.map((serv) => (
                <option key={serv} value={serv}>{serv}</option>
              ))}
            </select>
          </div>

          {/* Modalidad */}
          <div className="input-group">
            <label htmlFor="modalidad">Modalidad de Atención</label>
            <select
              id="modalidad"
              value={formData.modalidad}
              onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}
              className="select-field"
              required
            >
              {MODALIDADES_DISPONIBLES.map((mod) => (
                <option key={mod} value={mod}>{mod}</option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div className="input-group">
            <div className="label-with-helper">
              <label htmlFor="fecha">Fecha de la Cita</label>
              <span className="helper-badge">Lun - Sáb</span>
            </div>
            <input
              type="date"
              id="fecha"
              required
              value={formData.fecha}
              onChange={(e) => handleDateChange(e.target.value)}
              min={minDate}
              max={maxDate}
              className="input-field"
            />
          </div>

          {/* Horario con Slots Interactivos */}
          <div className="input-group">
            <div className="label-with-helper">
              <label>Horario Disponible (Aproximadamente)</label>
              {isSaturday && <span className="helper-badge-warning">Sábado: Jornada Especial</span>}
            </div>

            <div className={`slots-grid ${isSaturday ? 'slots-grid-saturday' : ''}`}>
              {horariosDisponibles.map((timeSlot) => (
                <button
                  type="button"
                  key={timeSlot}
                  className={`slot-chip ${formData.hora === timeSlot ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, hora: timeSlot })}
                >
                  {timeSlot}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn-agendar"
            id="confirmar-cita"
            disabled={loading}
          >
            {loading ? 'Procesando agendamiento...' : 'Agendar Cita'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Agendar;