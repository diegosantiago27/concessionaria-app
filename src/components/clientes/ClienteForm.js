import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteService from '../../services/clienteService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import './ClienteForm.css';

function ClienteForm() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        clienteService.cadastrar({ nome, email, telefone })
            .then(() => navigate('/clientes'))
            .catch(error => console.error('Erro ao cadastrar:', error));
    };

    return (
        <div className="container"style={{
            width: "95%", 
            maxWidth: "1200px", 
            margin: "20px auto", 
            background: "transparent", 
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
        }}>
            <h1>Cadastrar Cliente</h1>
            <form className="form-container" onSubmit={handleSubmit}>

                <div className="input-group">
                    <label>Nome</label>
                    <input
                        type="text"
                        placeholder="Digite o nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Digite o email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Telefone</label>
                    <input
                        type="text"
                        placeholder="Digite o telefone"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                        required
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-green">
                        <FontAwesomeIcon icon={faSave} /> Cadastrar
                    </button>
                    <button type="button" onClick={() => navigate('/clientes')} className="btn btn-gray">
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </button>
                </div>

            </form>
        </div>
    );
}

export default ClienteForm;
