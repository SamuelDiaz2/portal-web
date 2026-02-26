
function Apk() {
    return (
        <div className="apk">
            <h1 className="apk-title">Descargar Aplicación</h1>

            {/* Opción 1: Enlace directo con atributo download */}
            <a href="/app-release.apk" download="PortalPacientes.apk">
                <button className="download-button">
                    Descargar APK
                </button>
            </a>
        </div>
    );
}

export default Apk;