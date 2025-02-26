import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pedidoService from '../../services/pedidoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import './PedidoEdit.css';

function PedidoEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pedido, setPedido] = useState({ clienteId: '', carroId: '', status: '' });

    useEffect(() => {
        pedidoService.buscarPorId(id)
            .then(response => setPedido(response.data))
            .catch(error => console.error('Erro ao buscar pedido:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        pedidoService.atualizar(id, pedido)
            .then(() => navigate('/pedidos'))
            .catch(error => console.error('Erro ao atualizar pedido:', error));
    };

    return (
        <div className="container">
            <h1>Editar Pedido</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Cliente ID</label>
                    <input type="text" value={pedido.clienteId} onChange={e => setPedido({ ...pedido, clienteId: e.target.value })} required />
                </div>

                <div className="input-group">
                    <label>Carro ID</label>
                    <input type="text" value={pedido.carroId} onChange={e => setPedido({ ...pedido, carroId: e.target.value })} required />
                </div>

                <div className="input-group">
                    <label>Status</label>
                    <input type="text" value={pedido.status} onChange={e => setPedido({ ...pedido, status: e.target.value })} required />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-blue">
                        <FontAwesomeIcon icon={faSave} /> Atualizar
                    </button>
                    <button type="button" onClick={() => navigate('/pedidos')} className="btn btn-gray">
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PedidoEdit;
