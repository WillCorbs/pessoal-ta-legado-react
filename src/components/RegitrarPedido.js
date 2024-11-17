import './RegistrarPedido.css';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';


function RegistrarPedido() {
    // Navegação
    const navigate = useNavigate();

    const handleNavegarParaPaginas = (caminho) => {
        navigate(`/${caminho}`);
    }


    // Registro do pedido
    const [pedidoData, setPedidoData] = useState({
        userId: '',
        produtoId: '',
        qtde: ''
    });
    
    const handleFormEdit = (event, name) => {
        setPedidoData({
            ...pedidoData,
            [name]: event.target.value
        });
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault();

            const response = await fetch('http://localhost:8000/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedidoData)
            });

            const json = await response.json();
            console.log(json);

            window.location.reload();
        } catch(err) {
            console.error('Erro:', err);
        }
    }


    // Lista dos usuários registrados
    const [users, setUsers] = useState([]);

    async function puxarListaUsuarios() {
        const api = await fetch('http://localhost:8000/api/users');

        if(api.ok) {
            let response = await api.json();
            console.log(response);
            setUsers(response);
        } else {
            console.log('Algo deu errado!!');
        }
    }

    useEffect(() => {
        puxarListaUsuarios();
    }, []);


    // Lista dos produtos registrados
    const [prods, setProds] = useState([]);

    async function puxarListaProdutos() {
        const api = await fetch('http://localhost:8000/api/produtos');

        if(api.ok) {
            let response = await api.json();
            console.log(response);
            setProds(response);
        } else {
            console.log('Algo deu errado!!');
        }
    }

    useEffect(() => {
        puxarListaProdutos();
    }, []);


    // Quantidade máxima do produto
    const [maxQtde, setMaxQtde] = useState([]);
    const [preco, setPreco] = useState([]);

    async function calcularMaxQtde(id) {
        const api = await fetch(`http://localhost:8000/api/produtos/${id}`);

        if(api.ok) {
            let response = await api.json();

            setMaxQtde(response.qtde);
            setPreco(response.preco);
        } else {
            console.log('Algo deu errado!!');
        }
    }


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

            <div id='formulario'>

                <h1>Registre um Pedido</h1>

                <form onSubmit={handleForm}>

                    <label htmlFor='users'>ID do Usuário:</label>
                    <select className='select-ids'
                        name='users'
                        id='users'
                        required
                        onChange={(e) => handleFormEdit(e, 'userId')}>
                        <option hidden disabled selected value=''>-- Selecione um Usuário --</option>
                        {users.map((user) => (
                            <option value={user.id}>{user.id} ({user.email})</option>
                        ))}
                    </select><hr/>

                    <label htmlFor='prods'>ID do Produto:</label>
                    <select className='select-ids'
                        name='prods'
                        id='prods'
                        required
                        onChange={(e) => {
                            handleFormEdit(e, 'produtoId');
                            calcularMaxQtde(e.target.value);
                        }}>
                        <option hidden disabled selected value=''>-- Selecione um Produto --</option>
                        {prods.map((prod) => (
                            <option value={prod.id}>{prod.id} ({prod.nome})</option>
                        ))}
                    </select><hr/>

                    <label htmlFor='qtde'>Quantidade:</label>
                    <input type='number'
                        name='qtde'
                        id='qtde'
                        required
                        value={pedidoData.qtde}
                        placeholder='Informe uma Quantidade'
                        min='0'
                        max={maxQtde}
                        onChange={(e) => {
                            handleFormEdit(e, 'qtde');
                        }}/><hr/>

                    <label htmlFor='total'>Total:</label>
                    <input type='number'
                        name='total'
                        id='total'
                        required
                        disabled
                        value={(pedidoData.qtde * preco).toFixed(2)}
                        placeholder='Preço'/><hr/>

                    <button className='btn-cadastro' type='submit'>Cadastrar</button>

                </form>

            </div>

        </div>
    );
}


export default RegistrarPedido;
