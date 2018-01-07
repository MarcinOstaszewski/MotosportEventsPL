import React from 'react';
import { 
    Link
} from 'react-router';

class NotFound extends React.Component {
    render() {
        return  <div className="notFound">
            Page not found. Go back to <Link to="/">Main page</Link>
        </div>
    }
}

export {NotFound}