import { supabase } from "../../lib/supabase";

function Dashboard() {
    

    const nombre = localStorage.getItem('nombreUsuario') || "Usuario";
    const servicio = localStorage.getItem('servicioUsuario') || "Servicio no especificado";

    return (
        <div className="dashboard-container">
            <h1>Bienvenido {nombre}</h1>
            <p>Aquí podrás ver tus próximas citas de {servicio}, historial de servicios y más.</p>
        </div>
    );
}

export default Dashboard;