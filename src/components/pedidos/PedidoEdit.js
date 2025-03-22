import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pedidoService from '../../services/pedidoService';
import clienteService from '../../services/clienteService';
import carroService from '../../services/carroService';
import funcionarioService from '../../services/funcionarioService';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

import './PedidoEdit.css';

function PedidoEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pedido, setPedido] = useState({
        clienteId: '',
        carroId: '',
        funcionarioId: '',
        status: ''
    });

    const [clienteNome, setClienteNome] = useState('Carregando...');
    const [carroNome, setCarroNome] = useState('Carregando...');
    const [funcionarioNome, setFuncionarioNome] = useState('Carregando...');

    useEffect(() => {
        pedidoService.buscarPorId(id)
            .then(response => {
                const data = response.data;
                setPedido({
                    clienteId: data.clienteId || '',
                    carroId: data.carroId || '',
                    funcionarioId: data.funcionarioId || '',
                    status: data.status || ''
                });

                console.log("Pedido recebido:", data);

                if (data.cliente) {
                    setClienteNome(data.cliente);
                } else if (data.clienteId) {
                    clienteService.buscarPorId(data.clienteId)
                        .then(res => setClienteNome(res.data.cliente))
                        .catch(() => setClienteNome('Cliente não encontrado'));
                } else {
                    setClienteNome('Cliente não encontrado');
                }


                if (data.carro) {
                    setCarroNome(data.carro);
                } else if (data.carroId) {
                    carroService.buscarPorId(data.carroId)
                        .then(res => setCarroNome(res.data.carro))
                        .catch(() => setCarroNome('Carro não encontrado'));
                } else {
                    setCarroNome('Carro não encontrado');
                }

                if (data.funcionario) {
                    setFuncionarioNome(data.funcionario);
                } else if (data.funcionarioId) {
                    funcionarioService.buscarPorId(data.funcionarioId)
                        .then(res => setFuncionarioNome(res.data.funcionario))
                        .catch(() => setFuncionarioNome('Funcionário não encontrado'));
                } else {
                    setFuncionarioNome('Funcionário não encontrado');
                }

            })
            .catch(error => console.error('Erro ao buscar pedido:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        pedidoService.atualizar(id, pedido)
            .then(() => navigate('/pedidos'))
            .catch(error => console.error('Erro ao atualizar pedido:', error));
    };

    return (
        <div className="container" style={{
            width: "31%",
            maxWidth: "1200px",
            margin: "20px auto",
            background: "transparent",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
        }}>
            <Header title="Editar Pedido" />

            <form className="form-container" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Cliente</label>
                    <input type="text" value={clienteNome} readOnly />
                </div>

                <div className="input-group">
                    <label>Carro</label>
                    <input type="text" value={carroNome} readOnly />
                </div>

                <div className="input-group">
                    <label>Funcionário</label>
                    <input type="text" value={funcionarioNome} readOnly />
                </div>

                <div className="input-group">
                    <label>Status</label>
                    <select
                        value={pedido.status}
                        onChange={e => setPedido({ ...pedido, status: e.target.value })}
                    >
                        <option value="Venda Iniciada">Venda Iniciada</option>
                        <option value="Em Andamento">Em Andamento</option>
                        <option value="Finalizada">Finalizada</option>
                    </select>
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
