import axios from 'axios';

const API_URL = 'http://localhost:5000/api/carros';

const api = axios.create({
  baseURL: API_URL,
});

// Criando os métodos no serviço
const carroService = {
  listar: () => api.get('/listar'),
  cadastrar: (dados) => api.post('/cadastrar', dados),
  excluir: (id) => api.delete(`/excluir/${id}`)
};

export default carroService;
