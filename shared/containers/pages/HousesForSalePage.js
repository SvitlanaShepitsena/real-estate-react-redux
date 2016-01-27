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
import * as citiesActions from '../../actions/cities';

class HousesForSalePageContainer extends Component {
    static contextTypes = {i18n: PropTypes.object};

    state = {
        linkToShare: '',
        isSharing: false
    };

    componentDidMount() {
        this.saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
        this.props.getCitiesIfNeeded(this.saleRent);
    }

    componentWillReceiveProps(nextProps) {
        this.cities = _.keys(nextProps.cities);
    }

    render() {
        return (
            <div style={{maxWidth:"100%"}}>

                {!this.props.params.city && this.cities &&
                <div>
                    <h1 style={{fontSize:28}}>Chicago North Suburbs Houses for Sale </h1>
                    <hr/>
                    <Grid>
                        {this.cities.map(city=> {
                            return (
                                <Cell
                                    col={4}
                                    key={city}>
                                    <Link to={this.props.location.pathname+ '/'+ city}
                                          style={{textDecoration:'none', color:'#393939',fontSize:18}}>
                                        {_.startCase(city.replace(/-+/, ' '))}
                                    </Link>
                                </Cell>
                            );
                        })}
                    </Grid>
                </div>
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
    return state.cities;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(citiesActions, dispatch);
}
HousesForSalePageContainer.need = [
    citiesActions.getCitiesIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(HousesForSalePageContainer);




