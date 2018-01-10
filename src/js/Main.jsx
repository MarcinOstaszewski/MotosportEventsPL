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
			let toDisplay = [];
			for (var i = 0; i <= tab.length-1; i++) {
				for (var j = 0; j <= tab[i].length-1; j++) {
					for (var k = 0; k <= tab[i][j].length-1; k++) {
						toDisplay.push(tab[i][j][k]);
						toDisplay.push(" / ");
					}
				}
			}


			
			return (
				<div className="homepage">
					<h1>DZIAŁA COŚ</h1>
					{/* <p>{this.state.allEvents[4]}</p> */}
					{/* <p>................</p> */}
					<p>111111</p>
					<p>{toDisplay}</p>
					<p>2222222</p>
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
