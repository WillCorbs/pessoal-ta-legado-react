import './CadastroProduto.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


function CadastroProduto() {
    // Navegação
    const navigate = useNavigate();

    const handleNavegarParaPaginas = (caminho) => {
        navigate(`/${caminho}`);
    }


    // Cadastro de produto
    const [productData, setProductData] = useState({
        nome: '',
        qtde: '',
        preco: ''
    });
    
    const handleFormEdit = (event, name) => {
        setProductData({
            ...productData,
            [name]: event.target.value
        });
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault();

            const response = await fetch('http://localhost:8000/api/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            const json = await response.json();
            console.log(json);

            window.location.reload();
        } catch(err) {
            console.error('Erro:', err);
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

                <h1>Cadastre um Produto</h1>

                <form onSubmit={handleForm}>

                    <label htmlFor='nome'>Nome:</label>
                    <input type='text'
                        name='nome'
                        id='nome'
                        required
                        value={productData.nome}
                        placeholder='Nome do Produto'
                        onChange={(e) => handleFormEdit(e, 'nome')}/><hr/>

                    <label htmlFor='qtde'>Quantidade:</label>
                    <input type='number'
                        name='qtde'
                        id='qtde'
                        required
                        value={productData.qtde}
                        placeholder='Informe uma Quantidade'
                        min='0'
                        onChange={(e) => handleFormEdit(e, 'qtde')}/><hr/>

                    <label htmlFor='preco'>Preço:</label>
                    <input type='number'
                        name='preco'
                        id='preco'
                        required
                        value={productData.preco}
                        placeholder='Digite o Preço'
                        min='0'
                        step='0.01'
                        onChange={(e) => handleFormEdit(e, 'preco')}/><hr/>

                    <button className='btn-cadastro' type='submit'>Cadastrar</button>

                </form>

            </div>

        </div>
    );
}


export default CadastroProduto;
