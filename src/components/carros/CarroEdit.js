import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import carroService from '../../services/carroService';
import Header from '../../components/Header'; // ✅ Importando o cabeçalho
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import './CarroEdit.css';

function CarroEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carro, setCarro] = useState({ modelo: '', ano: '', preco: '', status: 'Disponível' });

    useEffect(() => {
        carroService.buscarPorId(id)
            .then(response => setCarro(response.data))
            .catch(error => console.error('Erro ao buscar carro:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        carroService.atualizar(id, {
            ...carro,
            preco: Number(carro.preco),
            ano: Number(carro.ano)
        })
            .then(() => navigate('/carros'))
            .catch(error => console.error('Erro ao atualizar carro:', error));
    };

    return (
        <div className="container">
            <Header title="Editar Carro" /> 

            <form className="form-container" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Modelo</label>
                    <input type="text" value={carro.modelo} onChange={e => setCarro({ ...carro, modelo: e.target.value })} required />
                </div>

                <div className="input-group">
                    <label>Ano</label>
                    <input type="number" value={carro.ano} onChange={e => setCarro({ ...carro, ano: e.target.value })} required />
                </div>

                <div className="input-group">
                    <label>Preço</label>
                    <input type="number" value={carro.preco} onChange={e => setCarro({ ...carro, preco: e.target.value })} required />
                </div>

                <div className="input-group">
                    <label>Status</label>
                    <select value={carro.status} onChange={e => setCarro({ ...carro, status: e.target.value })}>
                        <option value="Disponível">Disponível</option>
                        <option value="Vendido">Vendido</option>
                    </select>
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-blue">
                        <FontAwesomeIcon icon={faSave} /> Atualizar
                    </button>
                    <button type="button" onClick={() => navigate('/carros')} className="btn btn-gray">
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CarroEdit;
