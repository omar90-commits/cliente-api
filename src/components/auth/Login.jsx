import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { enviarDatosAPI } from '../../helper';
import { CRMContext } from '../../Context/CRMcontext';

const Login = ({ history }) => {
	
	const { auth, setAuth } = useContext(CRMContext);
	const [credenciales, guardarCredenciales] = useState({});

	useEffect(() => {
		
		if (auth.auth) history.push('/');
	}, [auth, history]);

	// Almacenar lo que el usuario escribe en el state
	const leerDatos = e => {

		guardarCredenciales({
			...credenciales,
			[e.target.name]: e.target.value,
		})
	}

	// Iniciar sesion en el servidor
	const iniciarSesion = async e => {

		e.preventDefault();
		const url = 'http://localhost:5000/iniciar-sesion';

		// autenticar usuario

		try {

			const respuesta = await enviarDatosAPI(url, credenciales, 'POST');

			if (respuesta.status) {

				const mensaje = await respuesta.json();
				throw new Error(mensaje.mensaje);
			}

			localStorage.setItem('token', respuesta.token);
			setAuth({
				token: respuesta.token,
				auth: true,
			});

			Swal.fire(
				'Login correcto',
				'Haz iniciado sesion',
				'success'
			);

			history.push('/');

		} catch(error) {

			Swal.fire({
				type: 'error',
				title: 'Hubo un error',
				text: error
			});
		}
	}
	
	return (
		<div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >

                    <div className="campo">
                        <label>Email</label>
                        <input 
                            type="text"
                            name="email"
                            placeholder="Email para Iniciar Sesión"
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Password para Iniciar Sesión"
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>	
	)
}

export default withRouter(Login);