import { useState, useEffect, useContext } from 'react';
import { CRMContext } from './Context/CRMcontext';

export const useFetch = (url={}, history) => {
	
	const { auth, setAuth } = useContext(CRMContext);
	const [consulta, setConsulta] = useState({ data: null, loading: false, error: null });

	useEffect(() => {
		
		let isMounted = true;
		
		if (auth.token !== '' || !isMounted) {

			async function consumirAPI() {

				try {

					const resp = await fetch(url, { 
						headers: {
							Authorization: `Bearer ${auth.token}`
						}
					});

					if (resp.status !== 200) throw new Error(resp.status);

					return resp;

				} catch(err) {

					setAuth({
						token: '',
						auth: false,
					});

					history.push('/iniciar-sesion');
				}
			}

			consumirAPI()
				.then(res => res.json())
				.then(res => {
					
					console.log(res)
					setConsulta({ data: res, loading: true, error: null });
				})
				.catch(err => setConsulta({data: null, loading: true, error: 'Opps A ocurrido un error'}));

		} else history.push('/iniciar-sesion');

		return () => isMounted = false;
	
	}, [url, history, auth, setAuth]);
	
	return consulta;
}