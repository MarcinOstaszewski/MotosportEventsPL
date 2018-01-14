import React from 'react';
import ReactDOM from 'react-dom';

require('../sass/main.scss');

// import Routing from '../js/routing.jsx';

document.addEventListener('DOMContentLoaded', function () {

	class Fetch extends React.Component{
		constructor(props){
			super(props);
			this.state={
				filterType: "wszystkie",
				filterLocation: "wszystkie",
				filterLicence: "wszystkie",
				filterHomologation: "wszystkie",
				filteredEvents: [],
				eventsListToDisplay: []
			}
			// this.handleTypeChange = this.handleTypeChange.bind(this);  // ?necessary?
			// this.createEventsList = this.createEventsList.bind(this);  // ?necessary?
		}		
		handleTypeChange = (event) => {
			this.setState({ filterType: event.target.value });
		}

		componentDidMount() {

			fetch(`https://motosporteventspl.firebaseio.com/masterSheet.json`).then( r => r.json() ).then( response => {
				
				// create a list of events from fetch response
				let listOfFilteredEvents = [];
				for (var i = 1; i < response.length; i++) {
					let eventRecord = "<li key='"+i+"'>";
					for (var j = 0; j < response[i].length; j++) {
						eventRecord += response[i][j] + " - \t";
					}
					eventRecord += "</li>";
					listOfFilteredEvents.push(eventRecord);
				}
				console.log(listOfFilteredEvents);
				console.log("--------------");
 
				const listOfEvents  = response.map( (item, index) => {
					let eventRecord = "";
					for (var j = 0; j < item.length; j++) {
						eventRecord += item[j] + " - \t";
					}
					return <li key={index}> {eventRecord}</li>;
				})
				console.log(listOfEvents);
				
				this.setState({
					filteredEvents: listOfEvents
				})
				
			});	
		}

		render() {

			return (
				<div className="homepage">
					<h1>WYBIERZ INTERESUJĄCE CIĘ WYDARZENIE SAMOCHODOWE</h1>
					<p> - - - - - - - - - </p>
					<select
						className="select"
						onChange={this.handleTypeChange}
						value={this.state.filterType}>
						<option value="wszystkie">wszystkie</option>
						<option value="rajd">rajd</option>
						<option value="wyścig">wyścig</option>
						<option value="drift">drift</option>
						<option value="trening">trening</option>
					</select>
					<p>- - - - - - - - - - - -</p>
					<p>{ this.state.filteredEvents}</p>
					<p>- - - - - - - - - - - -</p>
					<ul>{ this.state.eventsListToDisplay }</ul>

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
