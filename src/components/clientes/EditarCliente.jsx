import React, { useState, useEffect } from 'react';
import { enviarDatosAPI } from '../../helper';
import { withRouter } from 'react-router-dom';
import { useFetch } from '../../useFetch';

const EditarCliente = ({ history, match }) => {
	
	const data = useFetch(`http://localhost:5000/clientes/${match.params.id}`);

	const [nombre, guardarNombre] = useState('');
	const [apellido, guardarApellido] = useState('');
	const [empresa, guardarEmpresa] = useState('');
	const [email, guardarEmail] = useState('');
	const [telefono, guardarTelefono] = useState('');

	useEffect(() => {
		
		if (data.loading) {
			
			const cliente = data.data.cliente;
			const { nombre, apellido, empresa, email, telefono } = cliente;
	
			guardarNombre(nombre);
			guardarApellido(apellido);
			guardarEmpresa(empresa);
			guardarEmail(email);
			guardarTelefono(telefono);
		}

	}, [data]);

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

		const resp = enviarDatosAPI(`http://localhost:5000/clientes/${match.params.id}`, cliente, 'PUT');
		
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
	                	defaultValue={nombre}
	                	onChange={e => guardarNombre(e.target.value)}
	                />
	            </div>

	            <div className="campo">
	                <label>Apellido:</label>
	                <input 
	                	type="text" 
	                	placeholder="Apellido Cliente"
	                	defaultValue={apellido}
	                	onChange={e => guardarApellido(e.target.value)}
	                />
	            </div>
	        
	            <div className="campo">
	                <label>Empresa:</label>
	                <input 
	                	type="text" 
	                	placeholder="Empresa Cliente" 
	                	defaultValue={empresa}
	                	onChange={e => guardarEmpresa(e.target.value)}
	                />
	            </div>

	            <div className="campo">
	                <label>Email:</label>
	                <input 
	                	type="email" 
	                	placeholder="Email Cliente" 
	                	defaultValue={email}
	                	onChange={e => guardarEmail(e.target.value)}
	                />
	            </div>

	            <div className="campo">
	                <label>Teléfono:</label>
	                <input 
	                	type="text" 
	                	placeholder="Teléfono Cliente"
	                	defaultValue={telefono}
	                	onChange={e => guardarTelefono(e.target.value)} 
	                />
	            </div>

	            <div className="enviar">
	                <input 
	                	type="submit" 
	                	className="btn btn-azul" 
	                	value="Editar Cliente"
	                	disabled={validarCliente()} 
	                />
	            </div>

	        </form>
	    </React.Fragment>	
	)
}

export default withRouter(EditarCliente);