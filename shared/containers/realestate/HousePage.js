'use strict';

import React, {Component, PropTypes} from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';

import config                                 from '../../config';
import {sendEvent}                          from '../../utils/googleAnalytics';

import {bindActionCreators} from 'redux';
import * as houseActions from '../../actions/house';
import ListingThumbCard from '../../components/ListingThumb/ListingThumbCard.js';

class HousePage extends Component {
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
        this.street = this.props.params.street.toLowerCase();
        this.saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        this.props.getHouseIfNeeded(this.saleRent, this.city, this.zip, this.street);
    }

    render() {
        return (
            <div style={{width:'100%'}}>
                {this.props.house &&
                <div>
                    <div>

                        #{this.props.house.mls}
                    </div>
                    <div>
                        ${this.props.house.price}
                    </div>
                    <div>
                        {this.props.house.address.street + this.props.house.address.city }
                    </div>
                    <br/>
                    <div>
                        Listing Agent: {this.props.house.agent}
                    </div>
                </div>}
            </div>

        );
    }
}
function mapStateToProps(state) {
    return state.house;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(houseActions, dispatch);
}
HousePage.need = [
    houseActions.getHouseIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(HousePage);




