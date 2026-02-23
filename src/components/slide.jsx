import './slide.css';
import React from 'react';

function SlideImages() {
    return (
        <div className="slider-viewport">
            <div className="slider-wrapper">
                <div className="slide">
                    <img src="images/slide1.jpg" alt="Slide 1" />
                </div>
                <div className="slide">
                    <img src="images/slide2.jpg" alt="Slide 2" />
                </div>
                <div className="slide">
                    <img src="images/slide3.jpg" alt="Slide 3" />
                </div>
                {/* Repetimos la primera imagen al final para un efecto infinito suave */}
                <div className="slide">
                    <img src="images/slide1.jpg" alt="Slide 1" />
                </div>
            </div>
        </div>
    );
}

export default SlideImages;