import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pedidoService from '../../services/pedidoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
        <div className="container">
            <h1>Lista de Pedidos</h1>
            <div className="button-container">
                <button onClick={() => navigate('/pedidos/cadastrar')} className="btn btn-green">
                    <FontAwesomeIcon icon={faPlus} /> Novo Pedido
                </button>
                {/* ✅ Novo botão de Voltar */}
                <button onClick={() => navigate('/')} className="btn btn-gray">
                    <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Cliente</th>
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
