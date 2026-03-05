// version apk actual: 1.2
// app-debug.apk actual 1.2

import './apk.css';



const version = "1.2";

function Apk() {
    return (
        <div className="apk">
            <h1 className="apk-title">Descargar Aplicación</h1>

            <h2>Versión: {version}</h2>

            {/* Opción 1: Enlace directo con atributo download */}
            <a href="descargas/app-debug.apk" download="PortalProfesionales.apk">
                <button className="download-button">
                    Descargar APK
                </button>
            </a>
        </div>
    );
}

export default Apk;