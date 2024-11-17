import './ListarUsuarios.css';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


function ListarUsuarios() {
    // Update de usuários
    const navigate = useNavigate();
    const updateUsuario = (id) => {
        navigate(`/update-usuario/${id}`);
    }

    const handleNavegarParaPaginas = (caminho) => {
        navigate(`/${caminho}`);
    }


    // Puxando a lista de usuários
    const [dados, setDados] = useState([]);

    async function puxarLista() {
        const api = await fetch('http://localhost:8000/api/users');

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
    return (
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

            <div id="lista-usuarios">

                <h1>Lista de Usuários</h1>

                <table id='tb-usuarios'>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>CPF / CNPJ</th>
                            <th>CEP</th>
                            <th>Atualizar</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dados.map((usuario) => (
                            <tr key={usuario.id}>

                                <td>{usuario.id}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.cpf_cnpj}</td>
                                <td>{usuario.cep}</td>
                                <td>
                                    <button className='btn-atualizar' type='button'
                                        onClick={() => updateUsuario(usuario.id)}>Atualizar</button>
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}


export default ListarUsuarios;
