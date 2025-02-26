import axios from 'axios';

const API_URL = 'http://localhost:5000/api/clientes';

const api = axios.create({
  baseURL: API_URL,
});

// Criando métodos para listar, cadastrar e excluir clientes
const clienteService = {
  listar: () => api.get('/listar'),
  cadastrar: (dados) => api.post('/cadastrar', dados),
  excluir: (id) => api.delete(`/excluir/${id}`)
};

export default clienteService;
