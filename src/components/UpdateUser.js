import {useState} from 'react';
import './CadastroUser.css';
import { json } from 'react-router-dom';

function UpdateUser() {

    const [cep, setCep] = useState('');

    console.log(cep);

    const [usersData, setUsersData] = useState({
        name:'',
        email: '',
        password:'',
        cep:''
    })
    
    const handleFormEdit = (event, name) => {
        setUsersData ({
            ...usersData,
            [name]: event.target.value
        })
    }
    const handleForm = async (event) => {
        try 
        {
            event.preventDefault()
                const response = await fetch('http://localhost:8000/api/users/{id}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(usersData)
                })
                const json = await response.json();
                console.log(json);
            } catch (err) {
                console.error('Erro:', err);
            }
    }


    async function viaCep() {
        let api = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
        
        let resposta = await api.json();
        if(api.ok) {
            console.log(resposta);
            return;
        }
        console.log(resposta);
    }
    function salvar(){
        alert("salvo?")
    }

    return(
        <div id="formulario">
            <form onSubmit={handleForm}>

            <h2> Cadastra-se</h2>

            <label htmlFor="cep">CEP:</label>
            <input 
                type='text'
                name='cep'
                id='cep'
                value={cep}
                onChange={(e) => setCep(e.target.value)}
            />

            <label htmlFor="nome"> Nome: </label>
            <input type='text' name='nome' id='nome' value={usersData.name} onChange={(e) => handleFormEdit(e, 'name')}/>

            <label htmlFor="email"> Email: </label>
            <input type='email' name='Email' id='email' value={usersData.email} onChange={(e) => handleFormEdit(e, 'email')} />

            <label htmlFor="senha"> Senha: </label>
            <input type='password' name='senha' id='senha' value={usersData.password} onChange={(e) => handleFormEdit(e, 'password')} />

            
            <input type='submit' value='Atualizar'/>
            </form>
        </div>
    )
}

export default UpdateUser;
