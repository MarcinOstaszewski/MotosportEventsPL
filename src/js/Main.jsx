import React from 'react';
import ReactDOM from 'react-dom';

// import Routing from '../js/routing.jsx';

document.addEventListener('DOMContentLoaded', function () {
	
	require('../sass/main.scss');


	class Fetch extends React.Component{
		constructor(props){
			super(props);
			this.state={
				allEvents: []
			}
		}


		componentDidMount() {

			this.datebase = [];
			fetch(`https://motosporteventspl.firebaseio.com/masterSheet.json`).then( r => r.json() ).then( response => {

				this.datebase.push(response);

				this.setState({
					allEvents: this.datebase
				})
			});
			
		}


		render() {			

			let tab = this.state.allEvents;
			console.log(this.state.allEvents);
			let toDisplay = [];
			for (var i = 0; i <= tab.length-1; i++) {
				console.log(tab[i]);
				for (var j = 3; j <= tab[i].length-1; j++) {
					toDisplay.push(tab[i][j]);
					toDisplay.push("---");
				}
			}


			
			return (
				<div className="homepage">
					<h1>DZIAŁA COŚ</h1>
					{/* <p>{this.state.allEvents[4]}</p> */}
					{/* <p>................</p> */}
					<p>{toDisplay}</p>
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
