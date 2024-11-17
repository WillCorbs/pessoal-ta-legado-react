import './App.css';
import {useNavigate} from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const handleNavegarParaPaginas = (caminho) => {
    navigate(`/${caminho}`);
  }
  
  return(
    <div id="container-geral">

      <h1>Api Vendinha</h1>

      <div id='navegacao'>

        <button className='btn-navegacao' type='button'
          onClick={() => handleNavegarParaPaginas('cadastro-usuario')}>Cadastro de Usuários</button>
        <button className='btn-navegacao' type='button'
          onClick={() => handleNavegarParaPaginas('listar-usuarios')}>Lista de Usuários</button>
        <button className='btn-navegacao' type='button'
          onClick={() => handleNavegarParaPaginas('cadastro-produto')}>Cadastro de Produtos</button>
        <button className='btn-navegacao' type='button'
          onClick={() => handleNavegarParaPaginas('listar-produtos')}>Lista de Produtos</button>
        <button className='btn-navegacao' type='button'
          onClick={() => handleNavegarParaPaginas('registrar-pedido')}>Registro de Pedidos</button>
        <button className='btn-navegacao' type='button'
          onClick={() => handleNavegarParaPaginas('listar-pedidos')}>Lista de Pedidos</button>

      </div>

    </div>
  );
}


export default App;
