import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCar, faUserTie, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import './Home.css'; // Importando o CSS para estilos

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bem-vindo à Concessionária</h1>
      <p>Escolha uma opção:</p>
      <div className="card-container">
        <div className="card" onClick={() => navigate('/clientes')}>
          <FontAwesomeIcon icon={faUsers} className="card-icon" />
          <h2>Clientes</h2>
          <p>Gerencie os clientes cadastrados.</p>
        </div>
        <div className="card" onClick={() => navigate('/funcionarios')}>
          <FontAwesomeIcon icon={faUserTie} className="card-icon" />
          <h2>Funcionários</h2>
          <p>Controle os dados dos funcionários.</p>
        </div>
        <div className="card" onClick={() => navigate('/carros')}>
          <FontAwesomeIcon icon={faCar} className="card-icon" />
          <h2>Carros</h2>
          <p>Visualize e gerencie os veículos.</p>
        </div>
        {/* ✅ Novo Card para Pedidos */}
        <div className="card" onClick={() => navigate('/pedidos')}>
          <FontAwesomeIcon icon={faClipboardList} className="card-icon" />
          <h2>Pedidos</h2>
          <p>Acompanhe e gerencie os pedidos.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
