import { useState, useEffect } from 'react';
import './ListarUsuarios.css';

function ListarUsuarios() {
    const [cep, setCep] = useState('');

    const [idUser, setIdUser] = useState('');

    const [dados, setDados] = useState([]);
    const [dadosBkp, setDadosBkp] = useState([]);

    const [usersData, setUsersData] = useState({
        name: '',
        email: '',
        password: '',
        cep: '',
        cpf_cnpj: ''
    });

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
                const response = await fetch(`http://localhost:8000/api/users/${idUser}`, {
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

    async function puxarLista() {
        const api = await fetch('http://localhost:8000/api/users');

        if (api.ok) {
            let response = await api.json();
            console.log(response);
            setDados(response);
            setDadosBkp(response);
        } else {
            console.log('Algo deu errado!!');
        }
    }

    useEffect(() => {
        puxarLista();
    }, []);

    function updateUsuario(id) {
        setIdUser(id);

        document.getElementById('formulario-update').style.display = 'block';

        setUsersData (dadosBkp[parseInt(id) - 1]);
    }

    return (
        <div id='container-geral'>
            <div id="lista-usuarios">
                <h1>Listagem de Usuários</h1>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Senha</th>
                            <th>CPF / CNPJ</th>
                            <th>CEP</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.password}</td>
                                <td>{usuario.cpf_cnpj}</td>
                                <td>{usuario.cep}</td>
                                <td>
                                    <button onClick={() => updateUsuario(usuario.id)}>Atualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div id='formulario-update'>

                <button id='btnCancelar' onClick={() => document.getElementById('formulario-update').style.display = 'none'}>Cancelar</button>

                <form onSubmit={handleForm}>

                    <h2>Update Usuário (ID: {idUser})</h2>

                    <label htmlFor="cep">CEP:</label>
                    <input 
                        type='text'
                        name='cep'
                        id='cep'
                        value={usersData.cep}
                        onChange={(e) => handleFormEdit(e, 'cep')}
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

        </div>
    );
}

export default ListarUsuarios;
