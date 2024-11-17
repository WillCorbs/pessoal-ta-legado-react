import './ListarPedidos.css';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';


function ListarPedidos() {
    // Navegação
    const navigate = useNavigate();

    const handleNavegarParaPaginas = (caminho) => {
        navigate(`/${caminho}`);
    }


    // Puxando a lista de pedidos
    const [dados, setDados] = useState([]);

    async function puxarLista() {
        const api = await fetch('http://localhost:8000/api/pedidos');

        if(api.ok) {
            let response = await api.json();

            console.log(response);
            setDados(response);
        } else {
            console.log('Algo deu errado!!');
        }
    }

    useEffect(() => {
        puxarLista();
    }, []);


    // HTML da página
    return(
        <div id='container-geral'>

            <div id='barra-navegacao'>

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

            <div id='lista-pedidos'>

                <h1>Lista de Pedidos</h1>

                <table id='tb-pedidos'>

                    <thead>

                        <tr>

                            <th rowSpan='2'>Número</th>
                            <th colSpan='2'>Usuário</th>
                            <th colSpan='2'>Produto</th>
                            <th rowSpan='2'>Quantidade</th>
                            <th rowSpan='2'>Total</th>

                        </tr>

                        <tr>

                            <th>ID</th>
                            <th>Nome</th>
                            <th>ID</th>
                            <th>Nome</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dados.map((pedido) => (
                            <tr key={pedido.id}>

                                <td>{pedido.id}</td>
                                <td>{pedido.user.id}</td>
                                <td>{pedido.user.name}</td>
                                <td>{pedido.produto.id}</td>
                                <td>{pedido.produto.nome}</td>
                                <td>{pedido.qtde}</td>
                                <td>R$ {pedido.preco.toFixed(2)}</td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}


export default ListarPedidos;
