import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import carroService from '../../services/carroService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header'; 
import './CarroForm.css';

function CarroForm() {
  const navigate = useNavigate();
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [preco, setPreco] = useState('');
  const [status, setStatus] = useState('Disponível');

  const handleSubmit = (e) => {
    e.preventDefault();
    carroService.cadastrar({ modelo, ano: Number(ano), preco: Number(preco), status })
      .then(() => navigate('/carros'))
      .catch(error => console.error('Erro ao cadastrar:', error));
  };

  return (
    <div className="container"style={{
      width: "31%", 
      maxWidth: "1200px", 
      margin: "20px auto", 
      background: "transparent", 
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
  }}>
      <Header title="Cadastro de Carro" /> 
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Modelo</label>
          <input type="text" placeholder="Modelo" value={modelo} onChange={e => setModelo(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>Ano</label>
          <input type="number" placeholder="Ano" value={ano} onChange={e => setAno(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>Preço</label>
          <input type="number" placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Disponível">Disponível</option>
            <option value="Vendido">Vendido</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-green">
            <FontAwesomeIcon icon={faSave} /> Cadastrar
          </button>
          <button type="button" onClick={() => navigate('/carros')} className="btn btn-gray">
            <FontAwesomeIcon icon={faArrowLeft} /> Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CarroForm;
