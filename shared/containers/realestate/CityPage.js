'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';

import {Link} from 'react-router';
import TypeLink from './TypeLink';

import config                                 from '../../config';

import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions, CardText} from 'react-mdl/lib/Card';

import strformat                     from 'strformat';
import _ from 'lodash';

import {bindActionCreators} from 'redux';
import * as zipsActions from '../../actions/zips';

class cityPage extends Component {
    static contextTypes = {i18n: PropTypes.object};

    componentDidMount() {
        this.props.getZIPsIfNeeded();
    }

    componentWillReceiveProps(nextProps) {
        const zip = nextProps.zips.filter(zip=>zip.key.trim().toLowerCase() === (this.props.params.city).replace(/-+/g,' ').trim().toLowerCase());
        this.zips = _.filter(_.keys(zip), zip=>zip.length === 5);

    }

    render() {
        let city = _.capitalize(this.props.params.city.replace(/-+/g,' '));

        let saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        return (
            <div>
                {this.props.params.zip &&
                <div>
                    {this.props.children}
                </div>
                }

                {!this.props.params.zip &&
                <div>
                    <h1 style={{fontSize:28}}>
                        {_.capitalize(city)} Houses for Sale </h1>
                    <hr/>
                    <Grid>

                        <Cell col={6} phone={12}>
                            <Card>

                                <h4>{city} Zip Codes</h4>
                                {this.zips && this.zips.map(zip=> {
                                    return (
                                        <h5 key={zip}>
                                            <Link to={`/houses-for-${saleRent}/${city.toLowerCase()}/${zip}`}
                                                  style={{textDecoration:'none', color:'#393939',fontSize:18}}
                                            >
                                                {zip}
                                            </Link>
                                        </h5>)
                                })
                                }
                            </Card>
                        </Cell>
                        <Cell col={6} phone={12}>

                            <Card shadow={0} style={{height: 'auto', background: '#ffffff'}}>
                                <CardTitle expand style={{alignItems: 'flex-start', color: '#393939'}}>
                                    <h4 style={{marginTop: '0'}}> Property Types </h4>
                                </CardTitle>
                                <CardText border
                                          style={{ borderColor: '#393939', boxSizing: 'border-box', color: '#393939'}}>

                                    <h5>
                                        <TypeLink loc={this.props.location.pathname} type="Single Family Homes"/>
                                    </h5>
                                    <h5>
                                        <a>Multi-Family Home</a>
                                    </h5>
                                    <h5>
                                        <a>Townhouse</a>
                                    </h5>
                                    <h5>
                                        <a>Duplex</a>
                                    </h5>
                                    <h5>
                                        <a>Condominimum Unit</a>
                                    </h5>
                                    <h5>
                                        <a>Raw Land</a>
                                    </h5>
                                </CardText>
                            </Card>
                        </Cell>
                    </Grid>
                </div>}
            </div >
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




