import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteService from '../../services/clienteService';
import Header from '../../components/Header'; // ✅ Importando o Header
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './ClienteList.css';

function ClienteList() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        clienteService.listar()
            .then(response => setClientes(response.data))
            .catch(error => console.error('Erro ao buscar clientes:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            clienteService.excluir(id)
                .then(() => setClientes(clientes.filter(cliente => cliente.objectId !== id)))
                .catch(error => console.error('Erro ao excluir:', error));
        }
    };

    return (
        <div className="container" style={{
            width: "95%",
            maxWidth: "1200px",
            margin: "20px auto",
            background: "transparent",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
        }}>
             <Header title="Lista de Clientes" />

            <div className="button-container">
                <button onClick={() => navigate('/clientes/cadastrar')} className="btn btn-green">
                    <FontAwesomeIcon icon={faSave} /> Novo Cliente
                </button>
                <button type="button" onClick={() => navigate('/')} className="btn btn-gray">
                    <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                </button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.objectId}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td>
                                <button onClick={() => navigate(`/clientes/editar/${cliente.objectId}`)} className="btn btn-blue">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(cliente.objectId)} className="btn btn-red">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClienteList;
