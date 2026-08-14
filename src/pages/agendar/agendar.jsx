import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import './agendar.css';

function Agendar() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    nombre: '',
    servicio: '',
    identificacion: '',
    modalidad: '',
    telefono: '',
    direccion: '',
    barrio: '',
    municipio: '',
    fecha: '',
    hora: '09:00'
  });

  const fechaMin = new Date().toISOString().split('T')[0];
  const fechaMax = new Date();
  fechaMax.setDate(fechaMax.getDate() + 30);
  const fechaMaxStr = fechaMax.toISOString().split('T')[0];

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserData(prev => ({
          ...prev,
          nombre: user.user_metadata?.nombre_completo || '',
          servicio: user.user_metadata?.servicio || '',
          identificacion: user.user_metadata?.numero_identificacion || user.user_metadata?.identificacion || '',
          modalidad: user.user_metadata?.modalidad || '',
          telefono: user.user_metadata?.telefono || '',
          direccion: user.user_metadata?.direccion || '',
          barrio: user.user_metadata?.barrio_localidad || '',
          municipio: user.user_metadata?.municipio_ciudad || ''
        }));
      }
    }
    getProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.modalidad === 'seleccionar') return alert("Selecciona una modalidad");

    setLoading(true);

    // 1. Obtenemos el usuario de la sesión de manera explícita y asíncrona
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      setLoading(false);
      return alert("No se pudo obtener la sesión activa del usuario.");
    }

    // 2. Insertamos usando los valores del estado o del user_metadata directamente
    const { error } = await supabase
      .from('citas')
      .insert([
        {
          nombre_paciente: userData.nombre || user.user_metadata?.nombre_completo,
          identificacion: userData.identificacion || user.user_metadata?.numero_identificacion,
          telefono_contacto: userData.telefono || user.user_metadata?.telefono,
          direccion_atencion: userData.direccion || user.user_metadata?.direccion,
          barrio_localidad: userData.barrio || user.user_metadata?.barrio_localidad,
          municipio_ciudad: userData.municipio || user.user_metadata?.municipio_ciudad,
          servicio: userData.servicio,
          fecha: userData.fecha,
          hora: userData.hora,
          modalidad: userData.modalidad,
          estado: 'pendiente'
        }
      ]);

    if (error) {
      alert("Error al agendar: " + error.message);
    } else {
      alert("¡Cita agendada con éxito!");
      window.location.hash = '/dashboard';
    }
    setLoading(false);
  };

  return (
    <div className="agendar-container">
      <div className="form-card">
        <h2 className="form-title">Agendar Cita</h2>
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Nombre del Paciente</label>
            <input
              type="text"
              id="nombre"
              readOnly
              value={userData.nombre}
              className="input-readonly"
            />
          </div>

          <div className="input-group">
            <label>Servicio Asignado</label>
            <input
              type="text"
              id="servicio"
              readOnly
              value={userData.servicio}
              className="input-readonly"
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label>Fecha</label>
              <input
                type="date"
                id="fecha"
                required
                value={userData.fecha}
                onChange={(e) => setUserData({ ...userData, fecha: e.target.value })}
                min={fechaMin}
                max={fechaMaxStr}
              />
            </div>
            <div className="input-group">
              <label>Hora</label>
              <input
                type="time"
                id="hora"
                required
                value={userData.hora}
                onChange={(e) => setUserData({ ...userData, hora: e.target.value })}
                min="08:00"
                max="17:00"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Modalidad de Sesión</label>
            <input
              value={userData.modalidad}
              id="modalidad"
              readOnly
              className="input-readonly"
            />
          </div>

          <button type="submit" className="btn-agendar" id="confirmar-cita" disabled={loading}>
            {loading ? 'Procesando...' : 'Confirmar Cita'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Agendar;