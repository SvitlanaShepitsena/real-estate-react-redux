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
            <div
                className="CityCard"
                style={{ background: 'url(http://farm3.static.flickr.com/2711/4369664710_3c94dbffbc.jpg) center / cover' }}>
                <span>
                    City
                </span>
            </div>
        );
    }
}




