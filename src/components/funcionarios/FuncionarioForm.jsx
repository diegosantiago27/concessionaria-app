import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import funcionarioService from '../../services/funcionarioService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header';
import './FuncionarioForm.css';

function FuncionarioForm() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [salario, setSalario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        funcionarioService.cadastrar({ nome, cargo, salario: Number(salario) })
            .then(() => navigate('/funcionarios'))
            .catch(error => console.error('Erro ao cadastrar funcionário:', error));
    };

    return (
        <div className="container"style={{
            width: "31%",
            maxWidth: "1200px",
            margin: "20px auto",
            background: "transparent",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
        }}>
            <Header title="Cadastro de Funcionarios" />
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
