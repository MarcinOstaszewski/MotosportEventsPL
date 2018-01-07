import React from 'react';
import ReactDOM from 'react-dom';

import Routing from '../js/routing.jsx';
require('../sass/main.scss');

document.addEventListener('DOMContentLoaded', function () {

class Main extends React.Component {
	render() {
		return (
			<div>
				<Routing/>
			</div>
		)
	}
}

ReactDOM.render(
		<Main />, document.getElementById('app'));
		
});
