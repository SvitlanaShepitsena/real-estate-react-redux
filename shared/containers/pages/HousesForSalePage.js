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




