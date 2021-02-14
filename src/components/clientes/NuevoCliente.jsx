import React, { useState, useContext } from 'react';
import { enviarDatosAPI } from '../../helper';
import { withRouter } from 'react-router-dom';
import { CRMContext } from '../../Context/CRMcontext';

const NuevoCliente = ({ history }) => {
	
	const { auth } = useContext(CRMContext);

	const [nombre, guardarNombre] = useState('');
	const [apellido, guardarApellido] = useState('');
	const [empresa, guardarEmpresa] = useState('');
	const [email, guardarEmail] = useState('');
	const [telefono, guardarTelefono] = useState('');
		
	const token = window.localStorage.getItem('token');
	if (!auth.auth && (token === auth.token)) history.push('/iniciar-sesion');

	const validarCliente = () => {
		
		if (nombre.trim() === '' || apellido.trim() === '' || empresa.trim() === '' || email.trim() === '' || telefono.trim() === '') return true;

		return false;
	}

	const agregarCliente = async e => {
		
		e.preventDefault();

		const cliente = {
			nombre,
			apellido,
			empresa,
			email,
			telefono,
		}

		const resp = enviarDatosAPI('http://localhost:5000/clientes', cliente, 'POST');
		
		if (resp) history.push('/');
	}

	return (
		
		<React.Fragment>
			<h2>Nuevo Cliente</h2>

			<form
				onSubmit={agregarCliente}
			>
	            <legend>Llena todos los campos</legend>

	            <div className="campo">
	                <label>Nombre:</label>
	                <input 
	                	type="text" 
	                	placeholder="Nombre Cliente" 
	                	onChange={e => guardarNombre(e.target.value)}
	                />
	            </div>

	            <div className="campo">
	                <label>Apellido:</label>
	                <input 
	                	type="text" 
	                	placeholder="Apellido Cliente" 
	                	onChange={e => guardarApellido(e.target.value)}
	                />
	            </div>
	        
	            <div className="campo">
	                <label>Empresa:</label>
	                <input 
	                	type="text" 
	                	placeholder="Empresa Cliente" 
	                	onChange={e => guardarEmpresa(e.target.value)}
	                />
	            </div>

	            <div className="campo">
	                <label>Email:</label>
	                <input 
	                	type="email" 
	                	placeholder="Email Cliente" 
	                	onChange={e => guardarEmail(e.target.value)}
	                />
	            </div>

	            <div className="campo">
	                <label>Teléfono:</label>
	                <input 
	                	type="text" 
	                	placeholder="Teléfono Cliente" 
	                	onChange={e => guardarTelefono(e.target.value)} 
	                />
	            </div>

	            <div className="enviar">
	                <input 
	                	type="submit" 
	                	className="btn btn-azul" 
	                	value="Agregar Cliente"
	                	disabled={validarCliente()} 
	                />
	            </div>

	        </form>
	    </React.Fragment>
	)
}

export default withRouter(NuevoCliente);