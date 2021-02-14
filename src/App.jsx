import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layaut/Header';
import Navegacion from './components/layaut/Navegacion';
import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';
import Productos from './components/productos/Productos';
import Pedidos from './components/pedidos/Pedidos';
import Login from './components/auth/Login';
import CRMProvider from './Context/CRMcontext';

const App = () => (

	<Router>
		<CRMProvider>
			<Header />

			<div className="grid contenedor contenido-principal">
				<Navegacion />
		
				<main className="caja-contenido col-9">
					<Switch>
						<Route exact path="/" component={Clientes} />
						<Route exact path="/clientes/nuevo" component={NuevoCliente} />
						<Route exact path="/clientes/editar/:id" component={EditarCliente} />
						<Route exact path="/productos" component={Productos} />
						<Route exact path="/pedidos" component={Pedidos} />
						<Route exact path="/iniciar-sesion" component={Login} />
					</Switch>
				</main>
			</div>
		</CRMProvider>
	</Router>
);

export default App;