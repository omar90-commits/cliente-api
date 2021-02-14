import React, { useState, useEffect } from 'react';

export const CRMContext = React.createContext();

const CRMProvider = props => {
	
	const [auth, setAuth] = useState({
		token: '',
		auth: false,
	});
	const [update, setUpdate] = useState(false);

	useEffect(() => {

		const url = 'http://localhost:5000/clientes';
		const token = localStorage.getItem('token');
		
		async function consumirAPI() {

			try {

				const resp = await fetch(url, { 
					headers: {
						Authorization: `Bearer ${token}`
					}
				});

				if (resp.status !== 200) throw new Error(resp.status);
				
				setAuth({
					token: token,
					auth: true,
				});

				setUpdate(true);

			} catch(err) {
				
				setAuth({
					token: '',
					auth: false,
				});

				setUpdate(false);
			}
		}

		consumirAPI();
		
	}, [update]);

	return (
		<CRMContext.Provider value={{
			auth,
			setAuth,
		}}>
			{props.children}
		</CRMContext.Provider>
	)
}

export default CRMProvider;