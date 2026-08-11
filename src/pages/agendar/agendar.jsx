const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // 1. Obtener la sesión activa del usuario actual
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    alert("Debes iniciar sesión para agendar una cita.");
    setLoading(false);
    return;
  }

  // 2. Insertar la cita con referencia al user_id y guardando la ubicación
  const { error } = await supabase
    .from('citas')
    .insert([
      {
        user_id: user.id,
        nombre_paciente: user.user_metadata?.nombre_completo || userData.nombre,
        identificacion: user.user_metadata?.numero_identificacion,
        telefono_contacto: user.user_metadata?.telefono,
        direccion_atencion: user.user_metadata?.direccion,
        barrio_localidad: user.user_metadata?.barrio_localidad,
        municipio_ciudad: user.user_metadata?.municipio_ciudad,
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