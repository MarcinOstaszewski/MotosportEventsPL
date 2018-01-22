import React from 'react';
import ReactDOM from 'react-dom';

require('../sass/main.scss');

// import Routing from '../js/routing.jsx';

document.addEventListener('DOMContentLoaded', function () {

	// class SelectComponent extends React.Component{
	// 	constructor(props){
	// 		super(props);
	// 		this.state={
	// 			filterType: this.props.filterType,
	// 			eventTypesArray: this.props.eventTypesArray
	// 		}			
	// 	}	

	// 	handleTypeChange = (event) => {
	// 		this.setState({ filterType: event.target.value });
	// 	}

	// 	render() {

	// 		// creates a string with all possible type values for the first <select> option
	// 		let allValues = "";  
	// 		let firstSelectOption = this.state.eventTypesArray.map( item => {
	// 			allValues += item + ",";
	// 			return allValues;
	// 		});	

	// 		// creates list of all options for the <select> field
	// 		let allSelectTypeOptions = this.state.eventTypesArray.map( function(item,index) {
	// 			return <option value={  item  } key={  index+1  }>{  item  }</option>;
	// 		});

	// 		// creates the full <select> field
	// 		let selectField = (<select
	// 			className="select"
	// 			onChange={this.handleTypeChange}
	// 			value={this.state.filterType}>
	// 			<option value={ allValues } key="0">wszystkie</option>;
	// 			{allSelectTypeOptions}
	// 			</select>
	// 		);

	// 		return (
	// 			<div className="selectWithLabel">
	// 				<p>TYPY EVENTÓW : {this.state.eventTypesArray}</p>
	// 				<label className="selectLabel">{this.props.description[2]}
	// 					<select
	// 						className="select"
	// 						onChange={this.handleTypeChange}
	// 						value={this.state.filterType}>
	// 						<option value="rajd,wyścig,drift,trening">wszystkie</option>
	// 						<option value="rajd">rajd</option>
	// 						<option value="wyścig">wyścig</option>
	// 						<option value="drift">drift</option>
	// 						<option value="trening">trening</option>
	// 					</select>
	// 				</label>
	// 			</div>
	// 		)
	// 	}
	// }

	class Fetch extends React.Component{
		constructor(props){
			super(props);
			this.state={
				filterType: "",
				filterCity: "",
				filterLicence: "",
				filterHomologation: "",
				allEvents: [],
				filteredEvents: [],
				eventsListToDisplay: [],
				description: [],
				howManySelectFields: 0,
				eventTypesArray: [],
				eventCitiesArray: []
			}
		}		
		
		handleTypeChange = (event) => {
			this.setState({ filterType: event.target.value });
		}

		handleCitiesChange = (event) => {
			this.setState({ filterCity: event.target.value });
		}


		componentDidMount() {

			// gets events data from FireBase datebase and filtrates them
			fetch(`https://motosporteventspl.firebaseio.com/masterSheet.json`).then( r => r.json() ).then( response => {

				// gets the number of <select> fields to be created - from the first line
				this.setState({
					howManySelectFields: response[0][1]
				})
				
				// gets the second line to be used as a descriptions on the page
				this.setState({
					description: response[1]
				})
				
				// creates a list of events from fetch response - from third line to the end
				var pushedEvents = [];
				for (var i=2; i<=response.length-2; i++) {
					pushedEvents.push(response[i]);
				}

				// creates an OBJECT=>ARRAY of eventTYPES from every records THIRD field
				var eventTypes = pushedEvents.reduce( (types, item) => {
					item = item[2];
					if (!types[item]) {
						types[item] = 0
					}
					types[item]++;
					return types;
				}, {});
				eventTypes = Object.keys(eventTypes);

				// creates a string with all possible TYPES for the first option in <select> 
				let allTypes = "";  
				let firstTypeSelectOption = eventTypes.map( item => {
					allTypes += item + ",";
					return allTypes;
				});	
				console.log(allTypes);


				// creates an OBJECT=>ARRAY of eventCITIES from every records FOURTH field
				var allEventCities = pushedEvents.reduce( (cities, item) => {
					item = item[3];
					if (!cities[item]) {
						cities[item] = 0
					}
					cities[item]++;
					return cities;
				}, {});
				allEventCities = Object.keys(allEventCities);
				
				// creates a string with all possible CITIES for the first option in <select> 
				let allCities = "";  
				let firstCitySelectOption = allEventCities.map( item => {
					allCities += item + ",";
					return allCities;
				});	
				console.log(allCities);

				
				// Object.keys creates an array from object keys only
				// eventTypes: eventTypes,
				this.setState({
					allEvents: pushedEvents,
					allEventTypes: allTypes,
					allEventCities: allCities,
					eventTypesArray: eventTypes,
					filterType: allTypes,
					eventCitiesArray: allEventCities,
					filterCity: allCities
				})
			});   // ***********   END FETCH   *************
		}


		render() {

			// FILTERS EVENTS
			// filters all events to meet the options chosen with Select fields
			let listOfFilteredEvents = this.state.allEvents.filter( item => {
				// checkes if an event's type field consists the filter value
				if (this.state.filterType.includes(item[2])) {
					return item;
				}
			}).filter(item => {
				if (this.state.filterCity.includes( item[3] )) {
					return item;
				}
			});



			// CREATES TABLE WITH EVENTS
			// maps filtered events into a table row
			listOfFilteredEvents = listOfFilteredEvents.map( item => {
					return (
						<tr key={  item[0]  }>
							<td>{  item[0]  }</td>
							<td><strong>{  item[1]  }</strong></td>
							<td><em>{  item[2]  }</em></td>
							<td><strong>{  item[3]  }</strong></td>
							<td>{  item[4]  }</td>
							<td>{  item[5]  }</td>
						</tr>
					);
			})
			

			// ***********  CREATES TYPE SELECT FIELD ***********
			// creates a list of all options for the <select> field
			let allSelectTypeOptions = this.state.eventTypesArray.map( function(item,index) {
				return <option value={  item  } key={  index+1  }>{  item  }</option>;
			});

			// creates the full TYPES <select> field
			let selectTypeField = (<select
					className="select"
					onChange={  this.handleTypeChange  }
					value={  this.state.filterType  }>
					<option value={ this.state.allEventTypes } key="0">wszystkie</option>;
					{  allSelectTypeOptions  }
					</select>
			);
			// ***********  END TYPE SELECT FIELD *********** 
			

			// *****  CREATES CITY SELECT FIELD *****
			// creates a list of all options for the <select> field
			let allSelectCitiesOptions = this.state.eventCitiesArray.map( function(item,index) {
				return <option value={  item  } key={  index + 1  }>{  item  }</option>;
			});

			// creates the full CITIES <select> field
			let selectCityField = (<select
					className="select"
					onChange={  this.handleCitiesChange  }
					value={  this.state.filterCity  }>
					<option value={ this.state.allEventCities } key="0">wszystkie</option>;
					{  allSelectCitiesOptions  }
					</select>
			);
			// *****  END CITY SELECT FIELD ***** 


			return (
				<div className="homepage">
					<h1>PRZEGLĄDARKA WYDARZEŃ MOTOSPORTOWYCH - test</h1>
					<p>kryteria selekcji wydarzeń:</p> 

					
					<div className="selectContainer">
						<p className="selectLabel">{  this.state.description[2]  }</p>
						{  selectTypeField  }
					</div>

					<div className="selectContainer">
						<p className="selectLabel">{  this.state.description[3]  }</p>
						{  selectCityField  }
					</div>


					{/* <div className="selectContainer">
						<p className="selectLabel">{this.state.description[3]}</p>
						<select
							className="select"
							onChange={this.handleCitiesChange}
							value={this.state.filterCity}>
							<option value="Warszawa,Gdańsk,Kłodzk,Poznań,Słone,Piła,Toruń,Sczurów,Noc">wszystkie</option>
							<option value="Warszawa">Warszawa</option>
							<option value="Gdańsk">Gdańsk</option>
							<option value="Kłodzk">Kłodzk</option>
							<option value="Poznań">Poznań</option>
							<option value="Słone">Słone</option>
							<option value="Piła">Piła</option>
							<option value="Toruń">Toruń</option>
							<option value="Szczurów">Szczurów</option>
						</select>
					</div> */}
					
			



					<p className="tableTitle">Wydarzenia spełniające kryteria:</p>
					<table className="eventTable">
						<thead>
							<tr>
								<th>ID</th>
								<th><strong>{  this.state.description[1]  }</strong></th>
								<th><em>{  this.state.description[2]  }</em></th>
								<th><strong>{  this.state.description[3]  }</strong></th>
								<th>{  this.state.description[4]  }</th>
								<th>{  this.state.description[5]  }</th>
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
