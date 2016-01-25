'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';

import config                                 from '../../config';
import {sendEvent}                          from '../../utils/googleAnalytics';

import {bindActionCreators} from 'redux';
import * as articleActions from '../../actions/article';
import RentGrid from '../../components/RentGrid/RentGrid.js';

class HousesForRentPageContainer extends Component {
    static contextTypes = {i18n: PropTypes.object};

    state = {
        linkToShare: '',
        isSharing: false
    };

    handleTabChange = (category) => {
        this.props.history.pushState(null, this.props.location.pathname, {
            ...this.props.location.query,
            category: category !== 'ALL' ? category : undefined
        });

        sendEvent('articles page', 'category', category);
    };

    render() {
        return (
            <RentGrid
                articles={this.props.articles}
                search={this.props.search}
                linkToShare={this.state.linkToShare}
                selectedCategory={this.props.category}
                isSharing={this.state.isSharing}
                isEmbedded={this.props.location.query.embed}
                isLoading={this.props.isLoading}
                isEmpty={this.props.articles.length === 0}
                onTabChange={this.handleTabChange}
            />
        );
    }
}
function mapStateToProps(state) {
    return state.articles;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(articleActions, dispatch);
}
HousesForRentPageContainer.need = [
    articleActions.getArticlesIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(HousesForRentPageContainer);




