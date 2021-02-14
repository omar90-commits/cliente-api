import React from 'react';
import Cliente from './Cliente';
import { useFetch } from '../../useFetch';
import { Link, withRouter } from 'react-router-dom';

const Clientes = ({ history }) => {
	
	// correo@correo.com
	const data = useFetch('http://localhost:5000/clientes', history);

	return (
		<React.Fragment>
			<h2>Clientes</h2>

			<Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

			<ul className="listado-clientes">
				{
					(!data.loading  || data.error)? <p>Cargando...</p>
					: data.data.data.map(data => (
						<Cliente 
							key={data._id}
							data={data}
						/>
					))
				}
			</ul>
		</React.Fragment>
	)
}

export default withRouter(Clientes);