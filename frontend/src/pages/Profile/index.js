import React, {useState, useEffect} from 'react';
import './styles.css'
import logo from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

function Profile(){
	const [incidents, setIncidents] = useState([]);
	const history = useHistory();
	const ongNome = localStorage.getItem('ongNome');
	const ongId = localStorage.getItem('ongId');


	useEffect(() => {
		api.get('profile', {
			headers:{
				Authorization: ongId,
			}
		}).then(response => {
			setIncidents(response.data);
		})
	}, [ongId]);

	async function handleDeleteIncident(id){
		try{
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ongId,
				}
			});

			setIncidents(incidents.filter(incident => incident.id != id));

		}catch(err){
			alert('Erro');
		}
	}

	function handleLogout(){
		localStorage.clear();
		history.push('/');
	}

	return(
		<div className="profile-container">
			<header>
				<img src={logo} alt=""/>
				<span> Bem vinda, {ongNome} </span>
				<Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
				<button onClick={handleLogout}>X</button>
			</header>

			<h1>Casos Cadastrados</h1> 
			<ul>
				{incidents.map(incident => (
					<li key={incident.id}>
						<strong>CASO:</strong>
						<p>{incident.title}</p>
						<strong>DESCRIÇÃO</strong>
						<p>{incident.description}</p>
						<strong>VALOR:</strong>
						<p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
						<button onClick={() => handleDeleteIncident(incident.id)} type="button">X</button>
					</li>
				))}
			</ul>
		</div>
		
	);
}

export default Profile;