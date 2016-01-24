'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';

import config                                 from '../../config';
import {sendEvent}                          from '../../utils/googleAnalytics';

import {bindActionCreators} from 'redux';
import * as zipsActions from '../../actions/zips';
import HousesGrid from '../../components/HousesGrid/HousesGrid.js';

class glenviewPage extends Component {
    static contextTypes = {i18n: PropTypes.object};

    state = {
        city: 'glenview',
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
        //console.log(nextProps);
        const zip = nextProps.zips.filter(zip=>zip.key === this.state.city)[0];
        this.zips = Object.keys(zip).filter(code=>code.length === 5);


    }

    render() {
        return (
            <div>
                <h3>Glenview Listings for Sale by Zip Code</h3>
                <hr/>
                <h4>
                    <a>60025</a>
                </h4>
                <h4>
                    <a>60026</a>
                </h4>
                <h3>Glenview Listings for Sale by Property Type</h3>
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
glenviewPage.need = [
    zipsActions.getZIPsIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(glenviewPage);




