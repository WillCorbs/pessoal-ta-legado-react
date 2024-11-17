import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CadastroUser from './components/CadastroUser';
import UpdateUser from './components/UpdateUser';
import ListarUsuarios from './components/ListarUsuarios';
import ListarProdutos from './components/ListarProdutos';
import CadastroProduto from './components/CadastroProduto';
import UpdateProduto from './components/UpdateProduto';
import RegistrarPedido from './components/RegitrarPedido';
import ListarPedidos from './components/ListarPedidos';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/cadastro-usuario' element={<CadastroUser/>}></Route>
        <Route path='/cadastro-produto' element={<CadastroProduto/>}></Route>

        <Route path='/registrar-pedido' element={<RegistrarPedido/>}></Route>

        <Route path='/listar-usuarios' element={<ListarUsuarios/>}></Route>
        <Route path='/listar-produtos' element={<ListarProdutos/>}></Route>
        <Route path='/listar-pedidos' element={<ListarPedidos/>}></Route>

        <Route path='/update-usuario/:id' element={<UpdateUser/>}></Route>
        <Route path='/update-produto/:id' element={<UpdateProduto/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
