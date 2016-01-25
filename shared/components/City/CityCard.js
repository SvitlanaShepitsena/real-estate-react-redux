'use strict';

import React, {Component, PropTypes} from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions} from 'react-mdl/lib/Card';

if (process.env.BROWSER) {
    require('./CityCard.less');
}

export default class CityCard extends Component {

    render() {
        return (
            <Card
                className="CityCard"
                style={{ background: 'url(http://farm3.static.flickr.com/2711/4369664710_3c94dbffbc.jpg) center / cover' }}>
                <CardTitle expand/>
                <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                    <span className="CityCard__city-name"> City </span>
                </CardActions>
            </Card>
        );
    }
}




