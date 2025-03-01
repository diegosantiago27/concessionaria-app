import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import funcionarioService from '../../services/funcionarioService'; // ✅ Correção aqui!
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import './FuncionarioForm.css';

function FuncionarioForm() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [salario, setSalario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        funcionarioService.cadastrar({ nome, cargo, salario: Number(salario) }) // ✅ Correção aqui!
            .then(() => navigate('/funcionarios'))
            .catch(error => console.error('Erro ao cadastrar funcionário:', error));
    };

    return (
        <div className="container">
            <h1>Cadastrar Funcionário</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Nome</label>
                    <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>

                <div className="input-group">
                    <label>Cargo</label>
                    <input type="text" placeholder="Cargo" value={cargo} onChange={e => setCargo(e.target.value)} required />
                </div>

                <div className="input-group">
                    <label>Salário</label>
                    <input type="number" placeholder="Salário" value={salario} onChange={e => setSalario(e.target.value)} required />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-green">
                        <FontAwesomeIcon icon={faSave} /> Cadastrar
                    </button>
                    <button type="button" onClick={() => navigate('/funcionarios')} className="btn btn-gray">
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FuncionarioForm;
