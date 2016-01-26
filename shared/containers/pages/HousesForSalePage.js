'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
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
import * as zipsActions from '../../actions/zips';

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

    componentDidMount() {
        this.props.getZIPsIfNeeded();
    }

    componentWillReceiveProps(nextProps) {
        this.cities = _.unique(_.pluck(nextProps.zips, 'key')).map(city=>city.toLowerCase().trim());
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                {this.cities.map(city=> {
                    return (
                        <Cell
                            key={city}
                            align="top"
                            col={3}>
                            <Link to="/houses-for-sale/skokie" style={{textDecoration:'none'}}>
                                <Card
                                    className="CityCard"
                                    style={{ background: 'url(http://farm3.static.flickr.com/2711/4369664710_3c94dbffbc.jpg) center / cover' }}>
                                    <CardTitle expand/>
                                    <CardActions
                                        style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                    <span className="CityCard__city-name">
                            {city}
                                    </span>
                                    </CardActions>
                                </Card>
                            </Link>
                        </Cell>
                    );
                })}
                <Grid style={{backgroundColor:'#F4F4F4'}}>
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
    return state.zips;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(zipsActions, dispatch);
}
HousesForSalePageContainer.need = [
    zipsActions.getZIPsIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(HousesForSalePageContainer);




