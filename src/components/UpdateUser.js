import { useState, useEffect } from 'react';
import './UpdateUser.css';
import { useParams } from 'react-router-dom';

function UpdateUser() {

    const [cep, setCep] = useState('');

    const [idUser, setIdUser] = useState('');

    const [dados, setDados] = useState([]);
    const [dadosBkp, setDadosBkp] = useState([]);

    console.log(cep);

    const { id } = useParams();

    const [usersData, setUsersData] = useState({
        name:'',
        email: '',
        password:'',
        cep:'',
        cpf_cnpj:'',
    })
    
    const handleFormEdit = (event, name) => {
        setUsersData ({
            ...usersData,
            [name]: event.target.value
        })
    }

    const handleForm = async(event) => {
        try 
        {
            event.preventDefault()
                const response = await fetch(`http://localhost:8000/api/users/${id}`, {
                    method: 'PUT',
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
        
        window.location.reload();
    }

    async function puxarLista() {
        const api = await fetch(`http://localhost:8000/api/users/${id}`, {method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (api.ok) {
            let response = await api.json();
            console.log(response);
            setDados(response);
            setUsersData(response);
        } else {
            console.log('Algo deu errado!!');
        }
    }
    useState(() => {
        puxarLista();
    }, []);


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

            <h2> Update-se</h2>

            <label htmlFor="cep">CEP:</label>
            <input 
                type='text'
                name='cep'
                id='cep'
                value={usersData.cep}
                onChange={(e) => {handleFormEdit(e, 'cep');
                    handleCep(e, 'cep')}
                }
            />

                    <label htmlFor="nome"> Nome: </label>
                    <input type='text' name='nome' id='nome' required value={usersData.name} onChange={(e) => handleFormEdit(e, 'name')}/>

                    <label htmlFor="email"> Email: </label>
                    <input type='email' name='email' id='email' required value={usersData.email} onChange={(e) => handleFormEdit(e, 'email')} />

                    <label htmlFor="cpf_cnpj"> CPF: </label>
                    <input type='text' name='cpf_cnpj' id='cpf_cpnj' required value={usersData.cpf_cnpj} onChange={(e) => handleFormEdit(e, 'cpf_cnpj')} />

                    <label htmlFor="senha"> Senha: </label>
                    <input type='password' name='senha' id='senha' required value={usersData.password} onChange={(e) => handleFormEdit(e, 'password')} />

                    <input type='submit' value='Atualizar'/>
            </form>
        </div>
    )
}

export default UpdateUser;
