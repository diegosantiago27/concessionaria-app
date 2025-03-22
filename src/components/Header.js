import React from 'react';
import './Header.css'; 

function Header({ title }) {
    return (
        <header className="hero-section">
            <h1>DriveX Motors</h1>
            <p>Sua concessionária digital para gerenciar clientes, funcionários, veículos e pedidos.</p>
            <h2 className="page-title">{title}</h2>
        </header>
    );
}

export default Header;
