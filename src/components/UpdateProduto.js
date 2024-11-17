import './UpdateProduto.css';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';


function UpdateProduto() {
    // Navegação
    const navigate = useNavigate();


    // Update do produto
    const {id} = useParams();

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

            const response = await fetch(`http://localhost:8000/api/produtos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            const json = await response.json();
            console.log(json);

            navigate('/listar-produtos');
        } catch(err) {
            console.error('Erro:', err);
        }
    }


    // Preenchimento do formulário com os dados do produto
    async function puxarProduto() {
        const api = await fetch(`http://localhost:8000/api/produtos/${id}`);

        if(api.ok) {
            let response = await api.json();

            console.log(response);
            setProductData(response);
        } else {
            console.log('Algo de errado!!');
        }
    }

    useState(() => {
        puxarProduto();
    }, []);


    // HTML da página
    return(
        <div id='container-geral'>

            <button id='btn-voltar' type='button'
                onClick={() => navigate('/listar-produtos')}>Voltar</button>

            <div id='formulario'>

            <h1>Atualize o Produto com ID: {id}</h1>

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

                <button className='btn-cadastro' type='submit'>Atualizar</button>

            </form>

            </div>

        </div>
    );
}


export default UpdateProduto;
