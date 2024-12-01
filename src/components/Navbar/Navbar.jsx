import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css'; // Opcional, para personalização adicional.

export default function Navbar() {
  return (
    <nav className="bg-light navbar navbar-expand-lg bg-body-tertiary py-3">
      <div className="container-fluid">
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-3 ms-auto"> {/* Adicionado espaçamento entre itens */}
            <li className="nav-item">
              <NavLink 
                to="/" 
                className="text-decoration-none text-secondary fs-5" // Remove sublinhado e aplica cor suave
              >
                Sobre
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="register/user/system" 
                className="text-decoration-none text-secondary fs-5"
              >
                Registrar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="login/user/system" 
                className="text-decoration-none text-secondary fs-5"
              >
                Entrar
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
