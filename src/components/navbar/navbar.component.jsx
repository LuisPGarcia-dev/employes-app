import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navbar.styles.sass';


export default function NavBarComponent() {
return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
        <Link to="/">
        <img src="./images/LogoUPAX.png" alt="Upax" width="200" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/employes">Empleados</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/groups">Grupos</Link>
                </li>
            </ul>
        </div>
    </div>
</nav>
);
}