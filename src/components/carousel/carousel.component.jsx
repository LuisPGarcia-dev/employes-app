import React from 'react'
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './carousel.styles.sass';


export default function CarouselComponent() {

return (
<div id="carouselExampleControls" className="carousel slide mt-5" data-bs-ride="carousel">
    <div className="carousel-inner">
        <div className="carousel-item active">
            <img src="./images/LogoUPAX.png" className="w-100" alt="Imagen 1" />
        </div>
        <div className="carousel-item">
            <img src="./images/EdificioUpax.png" className="w-100" alt="Imagen 2" />
        </div>
        <div className="carousel-item">
            <img src="./images/react.png" className="w-100" alt="Imagen 3" />
        </div>
        <div className="carousel-item">
            <img src="./images/bs.png" className="w-100" alt="Imagen 4" />
        </div>
        <div className="carousel-item">
            <img src="./images/google_.jpg" className="w-100" alt="Imagen 5" />
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
</div>
);

}

//Carrusel de imagenes, se toma en cuenta que al usar el nativo de bootstrap manipula el DOM (no bueno para react)
// pero solo es un ejemplo prueba, lo ideal sería usar react-bootstrap (tambien lo uso en otra parte del code)