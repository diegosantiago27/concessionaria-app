import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteService from '../../services/clienteService';
import carroService from '../../services/carroService';
// import funcionarioService from '../../services/funcionarioService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import pedidoService from '../../services/pedidoService';
import './PedidoForm.css';

function PedidoForm() {
    const navigate = useNavigate();

    // Estados do formulário
    const [clientes, setClientes] = useState([]);
    const [carros, setCarros] = useState([]);
    // const [funcionarios, setFuncionarios] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [carroSelecionado, setCarroSelecionado] = useState('');
    // const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');

    const [status, setStatus] = useState('');

    // Lista de opções para o select de status
    const statusOptions = [
        "Venda Iniciada",
        "Aguardando pagamento",
        "Vendido"
    ];

    // Buscar clientes e carros ao carregar a página
    useEffect(() => {
        clienteService.listar()
            .then(response => setClientes(Array.isArray(response.data) ? response.data : []))
            .catch(error => console.error('Erro ao listar clientes:', error));

        carroService.listar()
            .then(response => setCarros(Array.isArray(response.data) ? response.data : []))
            .catch(error => console.error('Erro ao listar carros:', error));

            // funcionarioService.listar()
            // .then(response => setFuncionarios(Array.isArray(response.data) ? response.data : []))
            // .catch(error => console.error('Erro ao listar funcionários:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novoPedido = {
            clienteId: clienteSelecionado,
            carroId: carroSelecionado,
            // funcionarioId: funcionarioSelecionado,
            status
        };

        console.log("📌 Enviando pedido para API:", novoPedido); // 🛠 Verifica se os dados estão corretos

        try {
            const response = await pedidoService.cadastrar(novoPedido);
            console.log("✅ Pedido cadastrado com sucesso:", response.data);

            // Redirecionar após cadastro
            navigate('/pedidos');
        } catch (error) {
            console.error("❌ Erro ao cadastrar pedido:", error.response ? error.response.data : error);
        }
    };


    return (
        <div className="container">
            <h2>Cadastrar Pedido</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                 {/* Seleção de Funcionário */}
                 {/* <div className="input-group">
                    <label>Selecione um Funcionário:</label>
                    <select value={funcionarioSelecionado} onChange={(e) => setFuncionarioSelecionado(e.target.value)} required>
                        <option value="">-- Selecione --</option>
                        {funcionarios.map(funcionario => (
                            <option key={funcionario.objectId} value={funcionario.objectId}>
                                {funcionario.nome}
                            </option>
                        ))}
                    </select>
                </div> */}

                {/* Seleção de Cliente */}
                <div className="input-group">
                    <label>Selecione um Cliente:</label>
                    <select value={clienteSelecionado} onChange={(e) => setClienteSelecionado(e.target.value)} required>
                        <option value="">-- Selecione --</option>
                        {clientes.map(cliente => (
                            <option key={cliente.objectId} value={cliente.objectId}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Seleção de Carro */}
                <div className="input-group">
                    <label>Selecione um Carro:</label>
                    <select value={carroSelecionado} onChange={(e) => setCarroSelecionado(e.target.value)} required>
                        <option value="">-- Selecione --</option>
                        {carros.map(carro => (
                            <option key={carro.objectId} value={carro.objectId}>
                                {carro.modelo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Seleção de Status */}
                <div className="input-group">
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="">-- Selecione --</option>
                        {statusOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botões */}
                <div className="button-group">
                    <button type="submit" className="btn btn-green">
                        <FontAwesomeIcon icon={faSave} /> Cadastrar
                    </button>
                    <button type="button" onClick={() => navigate('/pedidos')} className="btn btn-gray">
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PedidoForm;
