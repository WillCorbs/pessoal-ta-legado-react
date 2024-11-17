import './UpdateUser.css';
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';


function UpdateUser() {
    // Navegação
    const navigate = useNavigate();


    // Update do produto
    const {id} = useParams();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        cep: '',
        cpf_cnpj: ''
    });
    
    const handleFormEdit = (event, name) => {
        setUserData({
            ...userData,
            [name]: event.target.value
        });
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault();

            const response = await fetch(`http://localhost:8000/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const json = await response.json();
            console.log(json);

            navigate('/listar-usuarios');
        } catch(err) {
            console.error('Erro:', err);
        }
    }


    // Verificando a validade do CEP
    const [mensagem, setMensagem] = useState(false);

    const handleCepChange = (e) => {
        const novoCep = e.target.value;
        console.log(novoCep);

        if(novoCep.length < 8) {
            setMensagem(false);
        } else {
            verificarCep(novoCep);
        }
    }

    async function verificarCep(cep) {
        try {
            const api = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        
            if(api.ok) {
                const resposta = await api.json();
                console.log(resposta);

                if(resposta.erro) {
                    setMensagem(false);
                } else {
                    setMensagem(true);
                }
            } else {
                console.log('Algo deu errado!!');
            }
        } catch(err) {
            console.error('Algo deu errado!!');
            setMensagem(false);
        }
    }


    // Preenchimento do formulário com os dados do usuário
    async function puxarUsuario() {
        const api = await fetch(`http://localhost:8000/api/users/${id}`);

        if(api.ok) {
            let response = await api.json();

            console.log(response);
            setUserData(response);
        } else {
            console.log('Algo de errado!!');
        }
    }

    useState(() => {
        puxarUsuario();
    }, []);


    // Mostrando a senha para o usuário
    function mostrarSenha() {
        const inputSenha = document.getElementById('senha');

        if(inputSenha) {
            if (inputSenha.type === 'password') {
                inputSenha.type = 'text';
            } else {
                inputSenha.type = 'password';
            }
        } else {
            console.error('Elemento com id "senha" não encontrado.');
        }
    }


    // Ativação do CapsLock
    const [isCapsLock, setIsCapsLock] = useState(false);

    const verificarCapsLock = (event) => {
        setIsCapsLock(event.getModifierState('CapsLock'));
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            verificarCapsLock(event);
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);


    // HTML da página
    return(
        <div id='container-geral'>

            <button id='btn-voltar' type='button'
                onClick={() => navigate('/listar-usuarios')}>Voltar</button>

            <div id='formulario'>

            <h1>Atualize o Usuário com ID: {id}</h1>

            <form onSubmit={handleForm}>

                    <label htmlFor="nome">Nome:</label>
                    <input type='text'
                        name='nome'
                        id='nome'
                        required
                        value={userData.name}
                        placeholder='Informe seu Nome'
                        onChange={(e) => handleFormEdit(e, 'name')}/><hr/>

                    <label htmlFor="email">Email:</label>
                    <input type='email'
                        name='Email'
                        id='email'
                        required
                        value={userData.email}
                        placeholder='Informe um Email'
                        onChange={(e) => handleFormEdit(e, 'email')}/><hr/>

                    <label htmlFor="cep">CEP:</label>
                    <input 
                        type='text'
                        name='cep'
                        id='cep'
                        required
                        value={userData.cep}
                        placeholder='Informe seu CEP'
                        pattern='[0-9]+'
                        maxLength='8'
                        onChange={(e) => {
                            handleFormEdit(e, 'cep');
                            handleCepChange(e);
                        }}/>
                    {mensagem && 
                        (<p id='valido'>CEP: Válido</p>)}<hr/>

                    <label htmlFor="cpf_cnpj">CPF:</label>
                    <input type='text'
                        name='cpf_cnpj'
                        id='cpf_cpnj'
                        required
                        value={userData.cpf_cnpj}
                        placeholder='Digite seu CPF/CNPJ'
                        pattern='[0-9]+'
                        maxLength='11'
                        onChange={(e) => handleFormEdit(e, 'cpf_cnpj')}/><hr/>

                    <label htmlFor="senha">Senha:</label>
                    <input type='password'
                        name='senha'
                        id='senha'
                        required
                        value={userData.password}
                        placeholder='Informe uma Senha'
                        onChange={(e) => handleFormEdit(e, 'password')}/>
                    <input id='mostrar-senha' name='mostrar-senha' type="checkbox" onChange={() => mostrarSenha()}/>
                    <label htmlFor='mostrar-senha'>Mostrar Senha</label>
                    {isCapsLock && (
                        <p id='detecta-capslock'>O Caps Lock está <strong>Ativo</strong>.</p>
                    )}<hr/>

                    <button className='btn-cadastro' type='submit'>Atualizar</button>

                </form>

            </div>

        </div>
    );
}


export default UpdateUser;
