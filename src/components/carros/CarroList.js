import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import carroService from '../../services/carroService';
import Header from '../../components/Header'; // ✅ Importando o cabeçalho
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './CarroList.css';

function CarroList() {
    const navigate = useNavigate();
    const [carros, setCarros] = useState([]);

    useEffect(() => {
        carroService.listar()
            .then(response => setCarros(response.data))
            .catch(error => console.error('Erro ao buscar carros:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este carro?')) {
            carroService.excluir(id)
                .then(() => setCarros(carros.filter(carro => carro.objectId !== id)))
                .catch(error => console.error('Erro ao excluir carro:', error));
        }
    };

    return (
        <div className="container">
            <Header title="Lista de Carros" /> 

            <div className="button-container">
                <button onClick={() => navigate('/carros/cadastrar')} className="btn btn-green">
                    <FontAwesomeIcon icon={faPlus} /> Novo Carro
                </button>
                <button onClick={() => navigate('/')} className="btn btn-gray">
                    <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                </button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Ano</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {carros.map(carro => (
                        <tr key={carro.objectId}>
                            <td>{carro.modelo}</td>
                            <td>{carro.ano}</td>
                            <td>R$ {carro.preco}</td>
                            <td>
                                <button onClick={() => navigate(`/carros/editar/${carro.objectId}`)} className="btn btn-blue">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(carro.objectId)} className="btn btn-red">
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

export default CarroList;
