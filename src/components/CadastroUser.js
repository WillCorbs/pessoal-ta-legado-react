import './CadastroUser.css';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';


function CadastroUser() {
    // Navegação
    const navigate = useNavigate();

    const handleNavegarParaPaginas = (caminho) => {
        navigate(`/${caminho}`);
    }

    // Cadastrando um Usuário
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
        });
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usersData)
            });

            const json = await response.json();
            console.log(json);

            window.location.reload();
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

            <div id="formulario">

                <h1>Cadastre-se</h1>

                <form onSubmit={handleForm}>

                    <label htmlFor="nome">Nome:</label>
                    <input type='text'
                        name='nome'
                        id='nome'
                        required
                        value={usersData.name}
                        placeholder='Informe seu Nome'
                        onChange={(e) => handleFormEdit(e, 'name')}/><hr/>

                    <label htmlFor="email">Email:</label>
                    <input type='email'
                        name='Email'
                        id='email'
                        required
                        value={usersData.email}
                        placeholder='Informe um Email'
                        onChange={(e) => handleFormEdit(e, 'email')}/><hr/>

                    <label htmlFor="cep">CEP:</label>
                    <input 
                        type='text'
                        name='cep'
                        id='cep'
                        required
                        value={usersData.cep}
                        placeholder='Informe seu CEP'
                        pattern='[0-9]+'
                        maxLength='8'
                        onChange={(e) => {
                            handleFormEdit(e, 'cep');
                            handleCepChange(e);
                        }}/>
                    {mensagem && 
                        (<p id='valido'>CEP: Válido</p>)}<hr/>

                    <label htmlFor='cpfcnpj'>CPF/CNPJ:</label>
                    <input type='text'
                        name='cpfcnpj'
                        id='cpfcnpj'
                        required
                        value={usersData.cpf_cnpj}
                        placeholder='Digite seu CPF/CNPJ'
                        pattern='[0-9]+'
                        maxLength='15'
                        onChange={(e) => handleFormEdit(e, 'cpf_cnpj')}/><hr/>

                    <label htmlFor="senha">Senha:</label>
                    <input type='password'
                        name='senha'
                        id='senha'
                        required
                        value={usersData.password}
                        placeholder='Informe uma Senha'
                        onChange={(e) => handleFormEdit(e, 'password')}/>
                    <input id='mostrar-senha' name='mostrar-senha' type="checkbox" onChange={() => mostrarSenha()}/>
                    <label htmlFor='mostrar-senha'>Mostrar Senha</label>
                    {isCapsLock && (
                        <p id='detecta-capslock'>O Caps Lock está <strong>Ativo</strong>.</p>
                    )}<hr/>

                    <button className='btn-cadastro' type='submit'>Cadastrar</button>

                </form>

            </div>

            <br/><br/><br/><br/><br/><br/>

        </div>
    );
}


export default CadastroUser;
