import {useState} from 'react';
import './CadastroProduto.css';
import { json } from 'react-router-dom';

function CadastroProduto() {

    const [prodsData, setProdsData] = useState({
        nome: '',
        qtde: '',
        preco: ''
    })
    
    const handleFormEdit = (event, name) => {
        setProdsData ({
            ...prodsData,
            [name]: event.target.value
        })
    }
    const handleForm = async (event) => {
        try 
        {
            event.preventDefault()
                const response = await fetch('http://localhost:8000/api/produtos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(prodsData)
                })
                const json = await response.json();
                console.log(json);
            } catch (err) {
                console.error('Erro:', err);
            }
    }

    return(
        <div id="formulario">
            <form onSubmit={handleForm}>

            <h2> Cadastrar Produto</h2>
          
            <label htmlFor="nome"> Nome Produto: </label>
            <input type='text' name='nome' id='nome' required value={prodsData.nome}
                onChange={(e) => handleFormEdit(e, 'nome')}/>

            <label htmlFor="qtde"> Quantidade: </label>
            <input type='number' name='qtde' id='qtde' required value={prodsData.qtde}
                onChange={(e) => handleFormEdit(e, 'qtde')} />

            <label htmlFor="preco"> Preço: </label>
            <input type='number' name='preco' id='preco' required value={prodsData.preco}
                onChange={(e) => handleFormEdit(e, 'preco')} />

            <input type='submit' value='Cadastrar'/>
            </form>
        </div>
    )
}

export default CadastroProduto;
