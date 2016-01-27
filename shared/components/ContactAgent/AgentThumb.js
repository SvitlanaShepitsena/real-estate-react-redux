import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['name', 'email', 'message'];
import {Card, CardText, CardTitle, CardActions} from 'react-mdl/lib/Card';
import Button      from 'react-mdl/lib/Button';

if (process.env.BROWSER) {
    require('./AgentThumb.less');
}
export default class AgentThumb extends Component {
    constructor(props) {
        // Running constructor of Parent (React.Component) for binding this to object.
        // Dynamically assigned global property This is always a component itself.
        super(props);
    }

    render() {
        return (
            <div className="AgentThumb">
                <img style={{width:60}}
                     src="http://res.cloudinary.com/svitlana/image/upload/v1453915134/broker-default-icon_xqgzj5.png"
                     alt="Re/Max 1st Class Broker Picture"/>
                <h4 style={{fontSize:16, display:"inline-block", margin:"0px 10px"}}>Agent Name</h4>
            </div>
        );
    }
}

