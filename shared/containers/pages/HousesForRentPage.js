'use strict';

import React, {Component, PropTypes} from 'react';
import Helmet from "react-helmet";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {appType, ogProps} from "../../config.js";

import {Card, CardTitle, CardActions} from 'react-mdl/lib/Card';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import _ from 'lodash';

import CityCard from '../../components/City/CityCard';
import * as citiesActions from '../../actions/cities';

class HousesForRentPageContainer extends Component {
    componentDidMount() {
        this.saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
        this.props.getCitiesIfNeeded(this.saleRent);
    }
    componentWillReceiveProps(nextProps) {
        this.cities = _.keys(nextProps.cities);
    }

    render() {
        const rent = ogProps.housesForRentPage;
        return (
            <div style={{maxWidth:"100%"}}>
                <Helmet
                    title={rent.title}
                    meta={[
                    {"name": "url", "content": `${rent.url}`},
                    {"name": "type", "content": `${appType}`},
                    {"name": "title", "content": `${rent.title}`},
                    {"name": "image", "content": `${rent.image}`},
                    {"name": "description", "content": `${rent.description}`},
                    {"property": "og:url", "content": `${rent.url}`},
                    {"property": "og:type", "content": `${appType}`},
                    {"property": "og:title", "content": `${rent.title}`},
                    {"property": "og:image", "content": `${rent.image}`},
                    {"property": "og:description", "content": `${rent.description}`}
                ]}
                />
                {!this.props.params.city && this.cities &&
                <div>
                    <h1 style={{fontSize:34}}>Chicago North
                        Suburbs {this.saleRent === 'sale' ? "Houses for Sale" : 'Apartments for Rent'}
                    </h1>
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
HousesForRentPageContainer.need = [
    citiesActions.getCitiesIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(HousesForRentPageContainer);




