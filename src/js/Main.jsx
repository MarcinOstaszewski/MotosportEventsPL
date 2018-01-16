import React from 'react';
import ReactDOM from 'react-dom';

require('../sass/main.scss');

// import Routing from '../js/routing.jsx';

document.addEventListener('DOMContentLoaded', function () {

	class Fetch extends React.Component{
		constructor(props){
			super(props);
			this.state={
				filterType: "rajd,wyścig,drift,trening",
				filterLocation: "Warszawa,Gdańsk,Kłodzk,Poznań,Słone,Piła,Toruń,Sczurów",
				filterLicence: "wszystkie",
				filterHomologation: "wszystkie",
				allEvents: [],
				filteredEvents: [],
				eventsListToDisplay: []
			}
		
		}		
		handleTypeChange = (event) => {
			this.setState({ filterType: event.target.value });
		}
		handleLocationChange = (event) => {
			this.setState({ filterLocation: event.target.value });
		}


		componentDidMount() {

			// gets events data from FireBase datebase and filtrates them
			fetch(`https://motosporteventspl.firebaseio.com/masterSheet.json`).then( r => r.json() ).then( response => {
				
			// creates a list of events from fetch response
				let eventsFromResponse = response;
				this.setState({
					allEvents: response
				})
			});
					
		}


		render() {
			let listOfFilteredEvents = this.state.allEvents.filter( item => {
				if (this.state.filterType.includes(item[2])) {
					return item;
				}
			}).filter(item => {
				if (this.state.filterLocation.includes(item[3])) {
					return item;
				}
			});



			listOfFilteredEvents = listOfFilteredEvents.map( item => {
					return <tr key={item[0]}><td>{item[0]}</td><td><strong>{item[1]}</strong></td><td><em>{item[2]}</em></td><td><strong>{item[3]}</strong></td><td>{item[4]}</td><td>{item[5]}</td></tr>;
			})

			return (
				<div className="homepage">
					<h1>PRZEGLĄDARKA WYDARZEŃ MOTOSPORTOWYCH - test</h1>
					<p>kryteria selekcji wydarzeń:</p> 
					<label className="selectLabel">typ: 
						<select
							className="select"
							onChange={this.handleTypeChange}
							value={this.state.filterType}>
							<option value="rajd,wyścig,drift,trening">wszystkie</option>
							<option value="rajd">rajd</option>
							<option value="wyścig">wyścig</option>
							<option value="drift">drift</option>
							<option value="trening">trening</option>
						</select>
					</label>
					<label>Miejscowość:
						<select
							className="select"
							onChange={this.handleLocationChange}
							value={this.state.filterLocation}>
							<option value="Warszawa,Gdańsk,Kłodzk,Poznań,Słone,Piła,Toruń,Sczurów">wszystkie</option>
							<option value="Warszawa">Warszawa</option>
							<option value="Gdańsk">Gdańsk</option>
							<option value="Kłodzk">Kłodzk</option>
							<option value="Poznań">Poznań</option>
							<option value="Słone">Słone</option>
							<option value="Piła">Piła</option>
							<option value="Toruń">Toruń</option>
							<option value="Szczurów">Szczurów</option>
						</select>
					</label>

					{/* <p>{ this.state.allEvents }</p> */}
					<p className="tableTitle">Wydarzenia spełniające kryteria:</p>
					<table className="eventTable">
						<thead>
							<tr>
								<th>ID</th>
								<th><strong>Nazwa</strong></th>
								<th><em>typ</em></th>
								<th><strong>Miejscowość</strong></th>
								<th>z licencją?</th>
								<th>z homologacją?</th>
							</tr>
						</thead>
						<tbody >
							{listOfFilteredEvents}
						</tbody>
					</table>

				</div>
			)
		}
	}


class Main extends React.Component {
	render() {
		return (
			<div>
				<Fetch/>
			</div>
		)
	}
}

ReactDOM.render(
		<Main />, document.getElementById('app'));
		
});
