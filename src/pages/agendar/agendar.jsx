import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import './agendar.css';

function Agendar() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    servicio: '',
    identificacion: '',
    modalidad: '',
    fecha: '',
    hora: '09:00'
  });
  

  // variables para limitar la selección de fecha a los próximos 30 días
  const fechaMin = new Date().toISOString().split('T')[0];
  const fechaMax = new Date();
  fechaMax.setDate(fechaMax.getDate() + 30);
  const fechaMaxStr = fechaMax.toISOString().split('T')[0];

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFormData(prev => ({
          ...prev,
          nombre: user.user_metadata?.nombre_completo || '',
          servicio: user.user_metadata?.servicio || '',
          identificacion: user.user_metadata?.numero_identificacion || '',
          modalidad: user.user_metadata?.modalidad || ''
        }));
      }
    }
    getProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.modalidad === 'seleccionar') return alert("Selecciona una modalidad");

    setLoading(true);

    const { error } = await supabase
      .from('citas')
      .insert([
        { 
          nombre_paciente: formData.nombre, 
          servicio: formData.servicio, 
          identificacion: formData.identificacion,
          fecha: formData.fecha, 
          hora: formData.hora,
          modalidad: formData.modalidad,
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
              value={formData.nombre}
              className="input-readonly"
            />
          </div>

          <div className="input-group">
            <label>Servicio Asignado</label>
            <input 
              type="text"
              id="servicio" 
              readOnly 
              value={formData.servicio}
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
                value={formData.fecha}
                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
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
                value={formData.hora}
                onChange={(e) => setFormData({...formData, hora: e.target.value})}
                min="08:00"
                max="17:00"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Modalidad de Sesión</label>
            <input
              value={formData.modalidad}
              id="modalidad"
              readOnly
              className="input-readonly"
            >
            </input>
          </div>

          <button type="submit" className="btn-agendar" id="confirmar-cita" disabled={loading} >
            {loading ? 'Procesando...' : 'Confirmar Cita'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Agendar;