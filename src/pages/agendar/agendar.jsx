import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import './agendar.css';

function Agendar() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: localStorage.getItem('nombreUsuario') || '',
    servicio: localStorage.getItem('servicioUsuario') || 'Fisioterapia',
    modalidad: '',
    fecha: '',
    hora: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('citas')
      .insert([
        { 
          nombre_paciente: formData.nombre, 
          servicio: formData.servicio, 
          fecha: formData.fecha, 
          hora: formData.hora,
          modalidad: formData.modalidad
        }
      ]);

    if (error) {
      alert("Error al agendar: " + error.message);
    } else {
      alert("¡Cita agendada con éxito!");
      console.log('Cita agendada:', formData);
      window.location.hash = '/dashboard';
      setFormData({ nombre: '', servicio: 'Fisioterapia', fecha: '', hora: '', modalidad: '' });
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
              required 
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div className="input-group">
            <label>Servicio</label>
            <select disabled
              value={formData.servicio}
              onChange={(e) => setFormData({...formData, servicio: e.target.value})}
            >
              <option value="Fisioterapia">Fisioterapia</option>
              <option value="Rehabilitación">Rehabilitación</option>
              <option value="Masaje Terapéutico">Masaje Terapéutico</option>
            </select>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Fecha</label>
              <input 
                type="date" 
                required 
                value={formData.fecha}
                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>Hora</label>
              <input 
                type="time"
                required 
                value={formData.hora}
                onChange={(e) => setFormData({...formData, hora: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Modalidad</label>
            <select
              value={formData.modalidad}
              onChange={(e) => setFormData({...formData, modalidad: e.target.value})}
            >
              <option value="seleccionar">Seleccionar modalidad</option>
              <option value="30-minutos">30 minutos</option>
              <option value="50-minutos">50 minutos</option>
            </select>
          </div>

          <button type="submit" className="btn-agendar" disabled={loading} >
            {loading ? 'Procesando...' : 'Confirmar Cita'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Agendar;