import React, {Component, PropTypes} from 'react';
import cx                              from 'classnames';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';

if (process.env.BROWSER) {
    require('./ListingThumbCard.less');
}

export default class ListingThumbCard extends Component {

    render() {

        const house = this.props.house

        return (
            <Card className="ListingThumbCard" shadow={1}>
                <CardTitle className='ListingThumbCard__head'>
                    {house.address.street}, {house.address.city},{house.address.zip}
                </CardTitle>
                <div className='ListingThumbCard__content'>

                    {house.images && house.images.length &&
                    < div
                        style={{width: 220,height:'auto',minHeight:150, background:  `url(${house.images[0]}) center / cover`} }>
                    </div>
                    }

                    {!(house.images && house.images.length) &&
                    <img
                        src='http://res.cloudinary.com/svitlana/image/upload/v1453494429/house-picture-icon_og71rx.png'
                        alt={house.address.street} style={{width:200}}/>
                    }
                </div>
            </Card>
        );
    }
}
