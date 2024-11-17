import './ListarProdutos.css';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


function ListarProdutos() {
    // Navegação para página de update
    const navigate = useNavigate();
    const updateProduto = (id) => {
        navigate(`/update-produto/${id}`);
    }

    const handleNavegarParaPaginas = (caminho) => {
        navigate(`/${caminho}`);
    }


    // Listagem dos produtos
    const [dados, setDados] = useState([]);

    async function puxarLista() {
        const api = await fetch('http://localhost:8000/api/produtos');

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

            <div id='lista-produtos'>

                <h1>Lista de Produtos</h1>

                <table id='tb-produtos'>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                            <th>Atualizar</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dados.map((produto) => (
                            <tr key={produto.id}>

                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.qtde}</td>
                                <td>R$ {produto.preco.toFixed(2)}</td>
                                <td>
                                    <button className='btn-atualizar' type='button'
                                        onClick={() => updateProduto(produto.id)}>Atualizar</button>
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}


export default ListarProdutos;
