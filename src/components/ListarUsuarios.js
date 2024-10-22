import {useState} from 'react';
import './CadastroUser.css';
import { json } from 'react-router-dom';

function ListarUsuarios() {

    async function puxar_lista() {
        const api = await fetch('http://localhost:8000/api/users');

        let response = api.json();
        if(api.ok) {
            console.log(response);
            return;
        }
    }

    return(
        <div id="formulario">
            <button type='button' onClick={puxar_lista}>Puxar Lista</button>
        </div>
    )
}

export default ListarUsuarios;
