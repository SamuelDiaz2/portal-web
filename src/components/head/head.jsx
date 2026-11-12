import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './head.css';

import imgSlide1 from '../../assets/img/doctor-ayudando-al-paciente-rehabilitacion.avif';
import imgSlide2 from '../../assets/img/doctor-ayudando.avif';
import imgSlide3 from '../../assets/img/fisioterapeuta-banda.avif';

function Head() {
  const imagenes = [
    {
      title: 'Terapia Física y Fisioterapia Especializada',
      badge: 'Terapia Física Personalizada',
      img: imgSlide1,
    },
    {
      title: 'Acompañamiento y Cuidado Profesional',
      badge: 'Atención Humana y Profesional',
      img: imgSlide2,
    },
    {
      title: 'Ejercicios de Recuperación y Movilidad',
      badge: 'Recuperación Progresiva',
      img: imgSlide3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Control 100% sincronizado por React (sin desincronización de CSS)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagenes.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, imagenes.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imagenes.length);
  };

  return (
    <section className="hero-head-container">
      {/* Luces ambientales difusas */}
      <div className="ambient-glow glow-purple"></div>
      <div className="ambient-glow glow-pink"></div>
      <div className="ambient-glow glow-green"></div>

      {/* ENCABEZADO ELEGANTE DEL HERO */}
      <div className="hero-text-content">
        <div className="hero-pill-tag">
          <span className="hero-pill-dot"></span>
          <span>Centro de Rehabilitación y Salud Integral</span>
        </div>

        <h1 className="hero-main-title">
          Recupera tu bienestar en <br className="hero-br" />
          <span className="hero-highlight">manos de profesionales</span>
        </h1>

        <p className="hero-description">
          Atención personalizada en fisioterapia, fonoaudiología, psicologia y
          acompañamiento integral para potenciar tu calidad de vida.
        </p>

        <div className="hero-cta-group">
          <Link to="/agendar" className="hero-btn-primary">
            <span>Agendar Cita</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
          <a href="#servicios" className="hero-btn-secondary">
            Ver Servicios
          </a>
        </div>
      </div>

      {/* CONTENEDOR DEL SLIDER CON REACT STATE (SIN DESINCRONIZACIÓN) */}
      <div
        className="hero-slider-card"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="slider-viewport">
          <div
            className="slider-wrapper-react"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {imagenes.map((item, index) => (
              <div key={index} className="slide-item">
                <img src={item.img} alt={item.title} />
                <div className="slide-overlay">
                  <span className="slide-badge">{item.badge}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Flechas de navegación sutiles estilo Glass */}
          <button
            type="button"
            className="slider-arrow arrow-left"
            onClick={handlePrev}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="slider-arrow arrow-right"
            onClick={handleNext}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>

        {/* INDICADORES 100% SINCRONIZADOS Y CLICKEABLES */}
        <div className="slider-indicators">
          {imagenes.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`indicator-dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir a diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Head;
