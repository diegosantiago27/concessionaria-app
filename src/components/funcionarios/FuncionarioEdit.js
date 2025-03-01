import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import funcionarioService from '../../services/funcionarioService'; // ✅ Correção aqui!
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import './FuncionarioEdit.css';

function FuncionarioEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [funcionario, setFuncionario] = useState({ nome: '', cargo: '', salario: '' });

    useEffect(() => {
        funcionarioService.buscarPorId(id) // ✅ Correção aqui!
            .then(response => setFuncionario(response.data))
            .catch(error => console.error('Erro ao buscar funcionário:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        funcionarioService.atualizar(id, {
            ...funcionario,
            salario: Number(funcionario.salario) // Converte para número
        }) // ✅ Correção aqui!
            .then(() => navigate('/funcionarios'))
            .catch(error => console.error('Erro ao atualizar funcionário:', error));
    };

    return (
        <div className="container">
            <h1>Editar Funcionário</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Nome</label>
                    <input type="text" value={funcionario.nome} onChange={e => setFuncionario({ ...funcionario, nome: e.target.value })} required />
                </div>

                <div className="input-group">
                    <label>Cargo</label>
                    <input type="text" value={funcionario.cargo} onChange={e => setFuncionario({ ...funcionario, cargo: e.target.value })} required />
                </div>

                <div className="input-group">
                    <label>Salário</label>
                    <input type="number" value={funcionario.salario} onChange={e => setFuncionario({ ...funcionario, salario: e.target.value })} required />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-blue">
                        <FontAwesomeIcon icon={faSave} /> Atualizar
                    </button>
                    <button type="button" onClick={() => navigate('/funcionarios')} className="btn btn-gray">
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FuncionarioEdit;
