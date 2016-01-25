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
    static contextTypes = {i18n: PropTypes.object};

    state = {
        linkToShare: '',
        isSharing: false
    };

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
        this.props.getZIPsIfNeeded();
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props.route);
        console.log(this.props.routes);

    }

    render() {
        this.saleRent = this.props.route.path;
        console.log(saleRent);
        let city = this.props.params.city;
        city = city.charAt(0).toUpperCase() + city.slice(1)
        return (
            <div>
                <h3>{city} Listings for Sale by Zip Code</h3>
                <hr/>
                {this.zips && this.zips.map(zip=> {
                    return (
                        <h4 key={zip}>
                            <a>{zip}</a>
                        </h4>)
                })}
                <h3>{city} Listings for Sale by Property Type</h3>
                <hr/>
                <h4>
                    <a>Single Family Home</a>
                </h4>
                <h4>
                    <a>Multi-Family Home</a>
                </h4>
                <h4>
                    <a>Townhouse</a>
                </h4>
                <h4>
                    <a>Duplex</a>
                </h4>
                <h4>
                    <a>Condominimum Unit</a>
                </h4>
                <h4>
                    <a>Raw Land</a>
                </h4>
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




