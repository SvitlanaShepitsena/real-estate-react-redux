'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';

import {Link} from 'react-router';

import config                                 from '../../config';

import {bindActionCreators} from 'redux';
import * as zipsActions from '../../actions/zips';
import HousesGrid from '../../components/HousesGrid/HousesGrid.js';

class cityPage extends Component {
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
        //console.log(nextProps);
        const zip = nextProps.zips.filter(zip=>zip.key === this.props.params.city)[0];
        this.zips = Object.keys(zip).filter(code=>code.length === 5);

    }

    render() {
        let city = this.props.params.city;
        city = city.charAt(0).toUpperCase() + city.slice(1);
        let saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
 
        return (
            <div>
                <h3>{city} Listings for Sale by Zip Code</h3>
                <hr/>
                {this.zips && this.zips.map(zip=> {
                    return (
                        <h4 key={zip}>
                            <Link to={`/houses-for-${saleRent}/${city.toLowerCase()}/${zip}`} style={{textDecoration:'none'}}>
                                {zip}
                            </Link>
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
    return state.zips;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(zipsActions, dispatch);
}
cityPage.need = [
    zipsActions.getZIPsIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(cityPage);




