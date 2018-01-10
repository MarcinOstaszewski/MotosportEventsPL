import React from 'react';
import ReactDOM from 'react-dom';
import {Navigation} from './navigation.jsx';
import {Main} from './Main.jsx';
import {Events} from './events.jsx';
import {NotFound} from './notFound.jsx';

import { Router,
    PropsRoute,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

class Routing extends React.Component {

    render() {
        return  <Router history={hashHistory}>
            <Route path='/' component={Navigation}>
                <IndexRoute component={Main} />
                <Route path='/events' component={Events} />
                
                <Route path='*' component={NotFound} />
            </Route>
        </Router>
    }
}

export {Routing}