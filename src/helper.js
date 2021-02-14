import Swal from 'sweetalert2';

export const enviarDatosAPI = async (url, cliente, method) => {

	const resp = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(cliente) 
	})
	.then(res => {

		if (res.status !== 200) {

			
			return res;
		}

		return res.json();
	})
	.then(res => res)

	return resp;
}