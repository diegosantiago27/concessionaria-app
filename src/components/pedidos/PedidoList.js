import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pedidoService from '../../services/pedidoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import './PedidoList.css';

function PedidoList() {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        pedidoService.listar()
            .then(response => setPedidos(response.data))
            .catch(error => console.error('Erro ao listar pedidos:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
            pedidoService.excluir(id)
                .then(() => setPedidos(pedidos.filter(pedido => pedido.id !== id)))
                .catch(error => console.error('Erro ao excluir pedido:', error));
        }
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
            <Header title="Lista de Pedidos" /> 
            <div className="button-container">
                <button onClick={() => navigate('/pedidos/cadastrar')} className="btn btn-green">
                    <FontAwesomeIcon icon={faPlus} /> Novo Pedido
                </button>
                {}
                <button onClick={() => navigate('/')} className="btn btn-gray">
                    <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Funcionario</th>
                        <th>Carro</th>
                        <th>Status</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => (
                        <tr key={pedido.id}>
                            <td>{pedido.cliente}</td>
                            <td>{pedido.funcionario}</td>
                            <td>{pedido.carro}</td>
                            <td>{pedido.status}</td>
                            <td>{new Date(pedido.data).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => navigate(`/pedidos/editar/${pedido.id}`)} className="btn btn-blue">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(pedido.id)} className="btn btn-red">
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

export default PedidoList;
