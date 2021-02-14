import React from 'react';
import { Link } from 'react-router-dom';

const Cliente = ({ data }) => {

    const eliminarCliente = async id => {

        await fetch(`http://localhost:5000/clientes/${id}`, {
            method: 'DELETE'
        });
    }
	
    return	(
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{data.nombre}</p>
                <p className="empresa">{data.empresa}</p>
                <p>{data.email}</p>
                <p>{data.telefono}</p>
            </div>

            <div className="acciones">
                <Link to={`/clientes/editar/${data._id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCliente(data._id)}
                   >
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>	
    )
}

export default Cliente;