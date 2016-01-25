'use strict';

import React, {Component, PropTypes} from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions} from 'react-mdl/lib/Card';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';
import {Link} from 'react-router';
import config                                 from '../../config';
import {sendEvent}                          from '../../utils/googleAnalytics';
import CityCard from '../../components/City/CityCard';

import {bindActionCreators} from 'redux';
import * as articleActions from '../../actions/article';

class HousesForSalePageContainer extends Component {
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
        this.props.getArticlesIfNeeded();
    }

    componentWillReceiveProps(nextProps) {
        const currentQuery = this.props.location.query;
        const nextQuery = nextProps.location.query;

    }

    render() {
        return (
            <div style={{maxWidth:"100%"}}>
                {!this.props.params.city &&
                <Grid style={{backgroundColor:'#F4F4F4'}}>
                    <Cell
                        align="top"
                        col={3}>
                        <Link to="/houses-for-sale/skokie" style={{textDecoration:'none'}}>
                            <CityCard/>
                        </Link>
                    </Cell>
                    <Cell
                        col={3}>
                        <Link to="/houses-for-sale/northbrook" style={{textDecoration:'none'}}>
                            <CityCard/>
                        </Link>
                    </Cell>
                    <Cell
                        col={3}>
                        <Link to="/houses-for-sale/glenview" style={{textDecoration:'none'}}>
                            <CityCard/>
                        </Link>
                    </Cell>
                </Grid>
                }
                {this.props.params.city &&
                <div>
                    {this.props.children}

                </div>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    return state.articles;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(articleActions, dispatch);
}
HousesForSalePageContainer.need = [
    articleActions.getArticlesIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(HousesForSalePageContainer);




