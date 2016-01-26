import React from 'react';
import {Link} from 'react-router';

export default class TypeLink extends React.Component {
    // Constructor
    constructor(props) {
        // Running constructor of Parent (React.Component) for binding this to object.
        // Dynamically assigned global property This is always a component itself.
        super(props);
    }

    render() {
        return (
            <div>
                <Link to={`${this.props.loc}/type/${this.props.type.replace(/\s+/g,'-')}`}>
                    {this.props.type}
                </Link>

            </div>
        )
    }

}