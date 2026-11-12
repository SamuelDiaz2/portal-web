import { useState, useRef } from 'react';
import serviciosData from './servicios.json';
import './servicios.css';

function Servicios() {
  const [categoriaActual, setCategoriaActual] = useState("Física");
  const carouselRef = useRef(null);

  const categorias = [
    { id: "Física", label: "Terapia Física", icon: "⚕️" },
    { id: "Psicología", label: "Psicología", icon: "🧠" },
    { id: "Respiratoria", label: "Respiratoria", icon: "🫁" },
  ];

  const serviciosFiltrados = serviciosData.filter(
    (item) => item.categoria === categoriaActual
  );

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="servicios" className="servicios-section">
      <div className="servicios-wrapper">

        {/* ENCABEZADO DE SECCIÓN ELEGANTE */}
        <div className="section-header">
          <div className="section-pill-tag">
            <span className="pill-dot"></span>
            <span>Especialidades Médicas y Terapéuticas</span>
          </div>
          <h2 className="section-title">
            Nuestros Servicios de <span className="title-gradient">Rehabilitación</span>
          </h2>
          <p className="section-subtitle">
            Planes terapéuticos personalizados con profesionales certificados para acompañar tu recuperación paso a paso.
          </p>
        </div>

        {/* SELECTOR SEGMENTADO + CONTROLES DE DESPLAZAMIENTO */}
        <div className="servicios-nav-container">
          <div className="servicios-pill-tabs">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`tab-pill-btn ${categoriaActual === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setCategoriaActual(cat.id);
                  if (carouselRef.current) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }
                }}
              >
                <span className="tab-icon">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Flechas para desplazar horizontalmente */}
          <div className="servicios-scroll-arrows">
            <button
              type="button"
              className="scroll-arrow-btn"
              onClick={() => handleScroll('left')}
              aria-label="Desplazar a la izquierda"
              title="Anterior"
            >
              ‹
            </button>
            <button
              type="button"
              className="scroll-arrow-btn"
              onClick={() => handleScroll('right')}
              aria-label="Desplazar a la derecha"
              title="Siguiente"
            >
              ›
            </button>
          </div>
        </div>

        {/* CARRUSEL HORIZONTAL DESPLAZABLE HACIA LA DERECHA */}
        <div className="servicios-horizontal-track" ref={carouselRef}>
          {serviciosFiltrados.map((item, index) => (
            <div key={index} className="servicio-card-horizontal">
              <div className="card-image-wrap">
                <img src={item.img} alt={item.title} loading="lazy" />
                <span className="card-category-badge">
                  {categoriaActual === "Física" ? "Física" : categoriaActual === "Psicología" ? "Psicología" : "Respiratoria"}
                </span>
              </div>

              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="servicios-scroll-hint">
          <span>← Desliza para explorar más servicios →</span>
        </div>

      </div>
    </section>
  );
}

export default Servicios;
