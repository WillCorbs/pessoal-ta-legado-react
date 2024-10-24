import { useState, useEffect } from 'react';
import './ListarUsuarios.css';

function ListarUsuarios() {
    const [dados, setDados] = useState([]);

    async function puxarLista() {
        const api = await fetch('http://localhost:8000/api/users');

        if (api.ok) {
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

    function updateUsuario(id) {
        alert(id);
    }

    return (
        <div id="formulario">
            <h1>Listagem de Usuários</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF / CNPJ</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.cpf_cnpj}</td>
                            <td>
                                <button onClick={() => updateUsuario(usuario.id)}>Atualizar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarUsuarios;
