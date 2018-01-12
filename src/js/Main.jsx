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
				filterType: "wyścig",
				filterLocation: "Gdańsk",
				filterLicence: "n",
				filterHomologation: "y",
				filteredEvents: []
			}
		}

		componentDidMount() {

			this.allEvents = [];

			fetch(`https://motosporteventspl.firebaseio.com/masterSheet.json`).then( r => r.json() ).then( response => {

				this.allEvents.push(response);

				this.setState({
					allEvents: this.allEvents,
				})
				
				if (this.state.filterType !== "any") {
					this.setState({
						filteredEvents: response.filter( item => {
							return item[2] == this.state.filterType;
						})
					}) 
				}
				console.log(this.state.filterType, this.state.filteredEvents);

				if (this.state.filterLocation !== "any") {
					const tempFilteredEvents = this.state.filteredEvents;
					console.log(tempFilteredEvents);
					this.setState({
						filteredEvents: tempFilteredEvents.filter( item => {
							return item[3] == this.state.filterLocation;
						})
					}) 
				}
				console.log(this.state.filterLocation, this.state.filteredEvents);

				if (this.state.filterLicence !== "any") {
					const tempFilteredEvents = this.state.filteredEvents;
					this.setState({
						filteredEvents: tempFilteredEvents.filter( item => {
							return item[4] == this.state.filterLicence;
						})
					}) 
				}
				console.log(this.state.filterLicence, this.state.filteredEvents);

				if (this.state.filterHomologation !== "any") {
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
					<h1>DZIAŁA COŚ</h1>
					{/* <p>{this.state.allEvents[4]}</p> */}
					<p></p>
					<p>111111</p>
					<p> aaa</p>
					<p>{this.state.allEvents}</p>
					<p> bbb</p>
					{/* <p>...{toDisplay}...</p> */}
					<p> ccc</p>
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
