'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';

import config                                 from '../../config';
import {sendEvent}                          from '../../utils/googleAnalytics';

import {bindActionCreators} from 'redux';
import * as housesActions from '../../actions/houses';
import HousesGrid from '../../components/HousesGrid/HousesGrid.js';

class ZipPage extends Component {
    constructor(props) {
        super(props);
    }

    handleQuizCardClick = (article) => {
        this.props.history.pushState(null, `/articles/${article.id}`, {
            embed: this.props.location.query.embed,
            assigneeId: this.props.location.query.assigneeId
        });

        sendEvent('article card', 'view details');
    };

    handleTabChange = (category) => {
        this.props.history.pushState(null, this.props.location.pathname, {
            ...this.props.location.query,
            category: category !== 'ALL' ? category : undefined
        });

        sendEvent('articles page', 'category', category);
    };

    handleStopSharing = () => {
        this.setState({
            linkToShare: '',
            isSharing: false
        });
    };

    componentDidMount() {
        this.city = this.props.params.city;
        this.zip = this.props.params.zip;
        this.saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        this.props.getHousesIfNeeded(this.saleRent, this.city, this.zip);

    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props.route);
        console.log(this.props.routes);

    }

    render() {
        return (
            <div>
                {this.props.houses && <ul style={{ listStyle: 'none'}}>
                    {this.props.houses.map(house=> {
                        return (
                            <li key={house.mls}>
                                <div>{house.address.street}, {house.address.city},{house.address.zip}</div>
                                <div
                                    style={{width: 220,height:'auto',minHeight:150, background:  `url(${house.images[0]}) center / cover`} }>
                                </div>
                                <hr/>
                            </li>
                        );
                    })}
                </ul>}
            </div>

        );
    }
}
function mapStateToProps(state) {
    return state.houses;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(housesActions, dispatch);
}
ZipPage.need = [
    housesActions.getHousesIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(ZipPage);




