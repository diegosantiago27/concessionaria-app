import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCar, faUserTie, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import './Home.css'; 

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1> DriveX Motors</h1>
        <p>Sua concessionária digital para gerenciar clientes, funcionários, veículos e pedidos.</p>
      </header>

      <section className="info-section">
        <h2>O que você deseja fazer hoje?</h2>
      </section>

      <div className="card-container">
        <div className="card" onClick={() => navigate('/clientes')}>
          <FontAwesomeIcon icon={faUsers} className="card-icon" />
          <h2>Clientes</h2>
          <p>Gerencie seus clientes e crie novos cadastros.</p>
        </div>

        <div className="card" onClick={() => navigate('/funcionarios')}>
          <FontAwesomeIcon icon={faUserTie} className="card-icon" />
          <h2>Funcionários</h2>
          <p>Visualize e edite os dados dos funcionários.</p>
        </div>

        <div className="card" onClick={() => navigate('/carros')}>
          <FontAwesomeIcon icon={faCar} className="card-icon" />
          <h2>Carros</h2>
          <p>Gerencie os veículos disponíveis na concessionária.</p>
        </div>

        <div className="card" onClick={() => navigate('/pedidos')}>
          <FontAwesomeIcon icon={faClipboardList} className="card-icon" />
          <h2>Pedidos</h2>
          <p>Acompanhe e controle os pedidos realizados.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
