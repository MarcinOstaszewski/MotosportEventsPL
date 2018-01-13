import React from 'react';
import ReactDOM from 'react-dom';

require('../sass/main.scss');

// import Routing from '../js/routing.jsx';

document.addEventListener('DOMContentLoaded', function () {

	class Fetch extends React.Component{
		constructor(props){
			super(props);
			this.state={
				allEvents: [],
				filterType: "rajd",
				filterLocation: "wszystkie",
				filterLicence: "wszystkie",
				filterHomologation: "wszystkie",
				filteredEvents: []
			}
		}

		handleTypeChange = (event) => {
			this.setState({
				filterType: event.target.value,
			})
		}

		componentDidMount() {

			this.allEvents = [];
			this.allEventsPush = [];

			fetch(`https://motosporteventspl.firebaseio.com/masterSheet.json`).then( r => r.json() ).then( response => {

				this.allEvents = response;
				this.allEventsPush.push(response);
				this.setState({
					allEvents: this.allEvents,
				})
				console.log(this.state.allEvents);
				
				if (this.state.filterType !== "wszystkie") {
					// console.log(this.state.filterType, this.allEvents);
					this.setState({
						filteredEvents: this.allEvents.filter( item => {
							return item[2] == this.state.filterType;
						})
					}) 
				}
				console.log(this.state.filterType, this.state.filteredEvents);

				if (this.state.filterLocation !== "wszystkie") {
					const tempFilteredEvents = this.state.filteredEvents;
					this.setState({
						filteredEvents: tempFilteredEvents.filter( item => {
							return item[3] == this.state.filterLocation;
						})
					}) 
				}
				console.log(this.state.filterLocation, this.state.filteredEvents);

				if (this.state.filterLicence !== "wszystkie") {
					const tempFilteredEvents = this.state.filteredEvents;
					this.setState({
						filteredEvents: tempFilteredEvents.filter( item => {
							return item[4] == this.state.filterLicence;
						})
					}) 
				}
				console.log(this.state.filterLicence, this.state.filteredEvents);

				if (this.state.filterHomologation !== "wszystkie") {
					const tempFilteredEvents = this.state.filteredEvents;
					this.setState({
						filteredEvents: tempFilteredEvents.filter( item => {
							return item[5] == this.state.filterHomologation;
						})
					}) 
				}
			
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
					<p>{this.state.filteredEvents}</p>

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
