import axios from 'axios';

const API_URL = 'http://localhost:5000/api/pedidos';

const pedidoService = {
    listar: () => axios.get(`${API_URL}/listar`),
    buscarPorId: (id) => axios.get(`${API_URL}/buscar/${id}`),
    cadastrar: (dados) => axios.post(`${API_URL}/cadastrar`, dados),
    atualizar: (id, dados) => axios.put(`${API_URL}/atualizar/${id}`, dados),
    excluir: (id) => axios.delete(`${API_URL}/excluir/${id}`)
};

export default pedidoService;
