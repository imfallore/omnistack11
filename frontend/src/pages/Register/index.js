import React, {useState} from 'react';
import './styles.css'
import logo from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';


function Register(){
	const [nome, setName] = useState('');
	const [email, setEmail] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [city, setCity] = useState('');
	const [uf, setUf] = useState('');

	const history = useHistory();

	async function handleRegister(e){
		e.preventDefault();

		const data ={
			nome,
			email,
			whatsapp,
			city,
			uf,
		};
		const response = await api.post('ongs', data);
		alert(`Seu ID de acesso: ${response.data.id}`);		
		history.push('/');
	}
	return(
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logo} alt=""/>

					<h1>Cadastro</h1>
					<p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
					<Link className="back-link" to="/">
						Não tenho cadastro
					</Link>
				</section>
				<form onSubmit={handleRegister}>
					<input
						placeholder="Nome da ONG"
						value={nome}
						onChange={e => setName(e.target.value)}
					/>

					<input
						type = "email"
						placeholder="E-mail"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>

					<input
						placeholder="Whatsapp"
						value={whatsapp}
						onChange={e => setWhatsapp(e.target.value)}
					/>

					<div className="input-group">
						<input
							placeholder="Cidade"
							value={city}
							onChange={e => setCity(e.target.value)}
						/>

						<input
							placeholder="UF"
							style={{width: 80}}
							value={uf}
							onChange={e => setUf(e.target.value)}
						/>
					</div>

					<button className="button" type="submit">Cadastrar</button>
				</form>
			</div>
		</div>
		
	);
}

export default Register;