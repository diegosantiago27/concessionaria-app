import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; 

import CarroList from './components/carros/CarroList';
import CarroForm from './components/carros/CarroForm';
import CarroEdit from './components/carros/CarroEdit';

import ClienteList from './components/clientes/ClienteList';
import ClienteForm from './components/clientes/ClienteForm';
import ClienteEdit from './components/clientes/ClienteEdit';

import FuncionarioList from './components/funcionarios/FuncionarioList';
import FuncionarioForm from './components/funcionarios/FuncionarioForm';
import FuncionarioEdit from './components/funcionarios/FuncionarioEdit';

import PedidoList from './components/pedidos/PedidoList';
import PedidoForm from './components/pedidos/PedidoForm';
import PedidoEdit from './components/pedidos/PedidoEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/carros" element={<CarroList />} />
        <Route path="/carros/cadastrar" element={<CarroForm />} />
        <Route path="/carros/editar/:id" element={<CarroEdit />} />

        <Route path="/clientes" element={<ClienteList />} />
        <Route path="/clientes/cadastrar" element={<ClienteForm />} />
        <Route path="/clientes/editar/:id" element={<ClienteEdit />} />

        <Route path="/funcionarios" element={<FuncionarioList />} />
        <Route path="/funcionarios/cadastrar" element={<FuncionarioForm />} />
        <Route path="/funcionarios/editar/:id" element={<FuncionarioEdit />} />

        <Route path="/pedidos" element={<PedidoList />} />
        <Route path="/pedidos/cadastrar" element={<PedidoForm />} />
        <Route path="/pedidos/editar/:id" element={<PedidoEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
