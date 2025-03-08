import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import funcionarioService from '../../services/funcionarioService';
import Header from '../../components/Header'; // ✅ Adicionando o cabeçalho
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './FuncionarioList.css';

function FuncionarioList() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    funcionarioService.listar()
      .then(response => setFuncionarios(response.data))
      .catch(error => console.error('Erro ao buscar funcionários:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      funcionarioService.excluir(id)
        .then(() => setFuncionarios(funcionarios.filter(funcionario => funcionario.objectId !== id)))
        .catch(error => console.error('Erro ao excluir funcionário:', error));
    }
  };

  return (
    <div className="container">
      <Header title="Lista de Funcionários" /> {/* ✅ Adicionando o cabeçalho */}

      <div className="button-container">
        <button onClick={() => navigate('/funcionarios/cadastrar')} className="btn btn-green">
          <FontAwesomeIcon icon={faPlus} /> Novo Funcionário
        </button>
        <button onClick={() => navigate('/')} className="btn btn-gray">
          <FontAwesomeIcon icon={faArrowLeft} /> Voltar
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Salário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(funcionario => (
            <tr key={funcionario.objectId}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cargo}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(funcionario.salario)}</td> {/* 🔹 Formatação correta do salário */}
              <td>
                <button onClick={() => navigate(`/funcionarios/editar/${funcionario.objectId}`)} className="btn btn-blue">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(funcionario.objectId)} className="btn btn-red">
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

export default FuncionarioList;
