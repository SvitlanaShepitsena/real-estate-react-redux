import React, {Component, PropTypes} from 'react';
import cx                              from 'classnames';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';

if (process.env.BROWSER) {
    require('./HouseCard.less');
}

export default class HouseCard extends Component {
    static contextTypes = {i18n: PropTypes.object};
    static propTypes = {
        name: PropTypes.string
    };

    render() {
        const {
            name
        } = this.props;

        return (
            <Card className="HouseCard" shadow={1}>
                <CardTitle className='HouseCard__head'>
                    {name}
                </CardTitle>
                <div className='HouseCard__content'>
                    {this.props.children}
                </div>
            </Card>
        );
    }
}
