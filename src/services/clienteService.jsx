import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/clientes` : 'http://localhost:5000/api/clientes';

const clienteService = {
    listar: () => axios.get(`${API_URL}/listar`),
    buscarPorId: (id) => axios.get(`${API_URL}/buscar/${id}`),
    cadastrar: (dados) => axios.post(`${API_URL}/cadastrar`, dados),
    atualizar: (id, dados) => axios.put(`${API_URL}/atualizar/${id}`, dados),
    excluir: (id) => axios.delete(`${API_URL}/excluir/${id}`)
};

export default clienteService;
