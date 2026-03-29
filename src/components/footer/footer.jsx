import './footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className='section1'>
                <h3>Contacto</h3>
                <p>Teléfono: +57 319 7740132</p>
                <p>Otro teléfono: +57 313 4188109</p>
                <p>Horario: Lunes a Viernes, 8:00 AM - 9:00 PM</p>
                <p>Sabado, 8:00 AM - 3:00 PM</p>
            </div>
            <div className='section2'>
                <h3>Redes Sociales</h3>
                <a href="https://www.tiktok.com/@Rehabilitarc"><img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" /></a>
                <a href="https://www.instagram.com/rehabilitarc28" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" /></a>
                <a href="https://x.com/@c_rehabilitar" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png" alt="Twitter" /></a>
                <a href="https://www.facebook.com/profile.php?id=61581084898463" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" /></a>
            </div>
            <div className='section3'>
                <a href="#">Volver al inicio</a>
            </div>
            <p>&copy; 2024 Rehabilitar C. Todos los derechos reservados.</p>
            <p>Desarrollado por el equipo de Rehabilitar-C.</p>
        </footer>
    );
}

export default Footer;