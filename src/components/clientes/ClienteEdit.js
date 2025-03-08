import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clienteService from '../../services/clienteService';
import Header from '../../components/Header'; // ✅ Importando o Header
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

import './ClienteEdit.css';

function ClienteEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({ nome: '', email: '', telefone: '' });

    useEffect(() => {
        clienteService.buscarPorId(id)
            .then(response => setCliente(response.data))
            .catch(error => console.error('Erro ao buscar cliente:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        clienteService.atualizar(id, cliente)
            .then(() => navigate('/clientes'))
            .catch(error => console.error('Erro ao atualizar cliente:', error));
    };

    return (
        <div className="container">
            <Header title="Editar Cliente" /> {/* ✅ Adicionando o cabeçalho */}
            
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Nome</label>
                    <input 
                        type="text" 
                        value={cliente.nome} 
                        onChange={e => setCliente({ ...cliente, nome: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={cliente.email} 
                        onChange={e => setCliente({ ...cliente, email: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <label>Telefone</label>
                    <input 
                        type="text" 
                        value={cliente.telefone} 
                        onChange={e => setCliente({ ...cliente, telefone: e.target.value })}
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-blue">
                        <FontAwesomeIcon icon={faSave} /> Atualizar
                    </button>
                    <button type="button" onClick={() => navigate('/clientes')} className="btn btn-gray">
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ClienteEdit;
