import React from 'react';
import ReactDOM from 'react-dom';

require('../sass/main.scss');

// import Routing from '../js/routing.jsx';

document.addEventListener('DOMContentLoaded', function () {

	// class SelectComponent extends React.Component{
	// 	constructor(props){
	// 		super(props);
	// 		this.state={
	// 		}			
	// 	}	
	// 	handleTypeChange = (event) => {
	// 		this.setState({ filterType: event.target.value });
	// 	}
	// 	render() {
	// 		return (
	// 			<div className="selectWithLabel">
	// 				 
	// 			</div>
	// 		)
	// 	}
	// }

	class Fetch extends React.Component{
		constructor(props){
			super(props);
			this.state={
				allEvents: [],
				allEventTypes: "",
				allEventTypesArray: [],
				allEventCities: "",
				allEventCitiesArray: [],
				allLicenceTypes: "",
				allLicenceTypesArray: [],
				allHomologationTypes: "",
				allHomologationTypesArray: [],
				filterType: "",
				filterCity: "",
				filterLicence: "",
				filterHomologation: "",
				filterVoivodship: "",
				filteredEvents: [],
				description: [],
				howManySelectFields: 0
			}
		}		
		handleChange = (event) => {
			this.setState({
				[event.target.name]: event.target.value
			})
		}

		handleTypeChange = (event) => {
			this.setState({ filterType: event.target.value });
		}
		handleCitiesChange = (event) => {
			this.setState({ filterCity: event.target.value });
		}
		handleLicenceChange = (event) => {
			this.setState({ filterLicence: event.target.value });
		}
		handleHomologationChange = (event) => {
			this.setState({ filterHomologation: event.target.value });
		}
		
		// creates OBJECTs of eventTYPES from corresponding records fields
		eventsToKeyNames = (pushedEvents, fieldNumber) => {
			// returns the effect of a REDUCE function  ;)
			return (
				pushedEvents.reduce( (keys, item) => {
					item = item[fieldNumber];
					if (!keys[item]) {
						keys[item] = 0;
					}
					keys[item]++;
					return keys;
				}, {})
			);
		}

		getAllFieldValues = (allEventTypes) => {
			let allValues = "";  
			allEventTypes.map( item => {
				allValues += item + ",";
				return allValues;
			});
			return allValues;
		}

		createSelectField = ( allOptions, filterName, thisStateFilterName, thisStateAllValues ) => {
			let optionsString = <option value={  thisStateAllValues  } key='0'>wszystkie</option>;
			let allOptionsMapped = allOptions.map( (item, index) => {
				return <option value={  item  } key={  index+1  }>{  item  }</option>;
			});
			let selectString = (
				<select 
					className='select' 
					name={  filterName  } 
					onChange={  this.handleChange  } 
					value={ thisStateFilterName  }> 
					{  optionsString  }
					{  allOptionsMapped  }
				</select>);
			return (
				<div className="selectContainer">
					{  selectString  }
				</div>
			);
		}



		componentDidMount() {

			// gets events data from FireBase datebase and filtrates them
			fetch(`https://motosporteventspl.firebaseio.com/masterSheet.json`).then( r => r.json() ).then( response => {

				// gets the number of <select> fields to be created - from the first line
				this.setState({
					howManySelectFields: response[0][1]
				}) //// TO BE USED IN FUTURE ;)
				
				// gets the second line to be used as a descriptions on the page
				this.setState({
					description: response[1]
				})
				
				// creates a list of events from fetch response - from third line to the end
				let pushedEvents = [];
				for (var i=2; i<=response.length-2; i++) {
					pushedEvents.push(response[i]);
				}

				// *****  Object.keys() creates an array from only object keys
				let allEventTypes = Object.keys(this.eventsToKeyNames(pushedEvents, 2));
				let allEventCities = Object.keys(this.eventsToKeyNames(pushedEvents, 3));			
				let allEventLicence = Object.keys(this.eventsToKeyNames(pushedEvents, 4));
				let allEeventHomologation = Object.keys(this.eventsToKeyNames(pushedEvents, 5));
				
				this.setState({
					allEvents: pushedEvents,
					filterType: this.getAllFieldValues(allEventTypes),
					allEventTypes: this.getAllFieldValues(allEventTypes),
					allEventTypesArray: allEventTypes,
					filterCity: this.getAllFieldValues(allEventCities),
					allEventCities: this.getAllFieldValues(allEventCities),
					allEventCitiesArray: allEventCities,
					filterLicence: this.getAllFieldValues(allEventLicence),					
					allLicenceTypes: this.getAllFieldValues(allEventLicence),
					allLicenceTypesArray: allEventLicence,
					filterHomologation: this.getAllFieldValues(allEeventHomologation),
					allHomologationTypes: this.getAllFieldValues(allEeventHomologation),
					allHomologationTypesArray: allEeventHomologation
				})
			});   // ***********   END FETCH   *************
		}


		render() {

			// FILTERS EVENTS
			// filters all events to meet the options chosen with Select fields
			let listOfFilteredEvents = this.state.allEvents.filter( item => {
				// checkes if an event's type field consists the filter value
				if (this.state.filterType.includes( item[2] )) {
					return item;
				}
			}).filter( item => {
				if (this.state.filterCity.includes( item[3] )) {
					return item;
				}
			}).filter( item => {
				if (this.state.filterLicence.includes (item[4] )) {
					return item;
				}
			}).filter ( item => {
				if (this.state.filterHomologation.includes ( item[5] )) {
					return item;
				}
			});

			// CREATES TABLE WITH EVENTS
			// maps each item in filteredEvents into a table row
			let MapOfFilteredEvents = listOfFilteredEvents.map( item => {
				return (
					<tr key={  item[0]  } className="tableRow">
						<td className="eventID">{  item[0]  }</td>
						<td className="eventName">{  item[1]  }</td>
						<td className="eventType">{  item[2]  }</td>
						<td className="eventCity">{  item[3]  }</td>
						<td className="eventLicence">{  item[4]  }</td>
						<td className="eventHomologation">{  item[5]  }</td>
					</tr>
				);
			})
		

			return (
				<div className="homepage">
					<div className="header">
						<div className="container">
							<h1 className="mainTitle">PRZEGLĄDARKA WYDARZEŃ MOTOSPORTOWYCH</h1>
						</div>
					</div>
					<div className="menuBar">
						<div className="container">
							<ul className="menuList">
								<li className="menuItem">MENU 1</li>
								<li className="menuItem">MENU 2</li>
								<li className="menuItem">MENU 3</li>
								<li className="menuItem">MENU 4</li>
								<li className="menuItem">MENU 5</li>
								<li className="menuItem">MENU 6</li>
								<li className="menuItem">MENU 7</li>							
							</ul>
						</div>
					</div>


					<div className="container">
						<div className="selectRow">													

						</div>
					</div>
						
					<div className="container">
						<table className="eventTable">
							<thead className="eventTableHead">
								<tr className="eventTableHeadRow">
									<th>ID</th>
									<th>
										{  this.state.description[1]  }
									</th>
									<th>
										{  this.state.description[2]  }
											{this.createSelectField( 
												this.state.allEventTypesArray, 
												"filterType", 
												this.state.filterType, 
												this.state.allEventTypes)
											}
									</th>
									<th>
										{  this.state.description[3]  }
										
											{this.createSelectField( 
												this.state.allEventCitiesArray, 
												"filterCity", 
												this.state.filterCity, 
												this.state.allEventCities)
											}

									</th>
									<th>
										{  this.state.description[4]  }
											{this.createSelectField( 
												this.state.allLicenceTypesArray, 
												"filterLicence", 
												this.state.filterLicence, 
												this.state.allLicenceTypes)
											}
									</th>
									<th>
										{  this.state.description[5]  }
											{this.createSelectField( 
												this.state.allHomologationTypesArray, 
												"filterHomologation", 
												this.state.filterHomologation, 
												this.state.allHomologationTypes)  
											}
									</th>
								</tr>
							</thead>
							<tbody className="eventTableBody">
								{MapOfFilteredEvents}
							</tbody>
							<tfoot className="eventTableFooter">
								<tr className="lastTableRow">
									<td colSpan="6" className="lastTableRowCell">{ listOfFilteredEvents.length>0 ? "Koniec listy wydarzeń" : "Brak wydarzeń spełniających kryteria" }</td>
									{/* <td></td><td></td><td></td><td></td><td></td> */}
								</tr>
							</tfoot>
						</table>
					</div>

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
