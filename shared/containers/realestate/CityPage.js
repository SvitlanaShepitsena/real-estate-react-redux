'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';

import {Link} from 'react-router';
import TypeLink from './TypeLink';

import config                                 from '../../config';

import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions, CardText} from 'react-mdl/lib/Card';

import _ from 'lodash';

import {bindActionCreators} from 'redux';
import * as zipsActions from '../../actions/zips';

class cityPage extends Component {
    static contextTypes = {i18n: PropTypes.object};

    componentDidMount() {
        this.props.getZIPsIfNeeded();
    }

    componentWillReceiveProps(nextProps) {
        const zip = nextProps.zips.filter(zip=>zip.key.trim().toLowerCase() === (this.props.params.city).replace(/-+/g, ' ').trim().toLowerCase());
        this.zips = _.filter(_.keys(zip), zip=>zip.length === 5);

    }

    render() {
        let city = _.capitalize(this.props.params.city.replace(/-+/g, ' '));

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
                            <Card shadow={0}
                                  style={{height: 'auto', width:'100%', background: '#ffffff', color: '#393939'}}>
                                <CardTitle style={{color: '#393939', width:'100%'}}>
                                    <h4 style={{margin: '0',fontSize:22, fontWeight:300}}>{city} Zip Codes</h4>
                                </CardTitle>
                                <CardText
                                    style={{width:'100%',margin:0, borderTop: '1px #E0E0E0 solid', boxSizing: 'border-box', color: '#393939'}}>
                                    <ul>
                                        {this.zips && this.zips.map(zip=> {
                                            return (
                                                <li key={zip}>
                                                    <Link
                                                        to={`/houses-for-${saleRent}/${city.toLowerCase()}/${zip}`}
                                                        style={{textDecoration:'none', color:'#393939',fontSize:18}}
                                                    >
                                                        {zip}
                                                        <span>At vero eos et accusamus et iusto odio dignissimos ducimus</span>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>
                                </CardText>
                            </Card>
                        </Cell>
                        <Cell col={6} phone={12}>
                            <Card shadow={0}
                                  style={{height: 'auto', width:'100%', background: '#ffffff', color: '#393939'}}>
                                <CardTitle expand style={{alignItems: 'flex-start', width:'100%'}}>
                                    <h4 style={{margin: '0',fontSize:22, fontWeight:300}}> Property Types </h4>
                                </CardTitle>
                                <CardText
                                    style={{width:'100%',margin:0, borderTop: '1px #E0E0E0 solid', boxSizing: 'border-box'}}>

                                    <h5>
                                        <Link to={this.props.location.pathname}
                                              style={{color: '#393939',textDecoration:'none'}}
                                              type="Single Family Homes">
                                            Single Family Home
                                        </Link>
                                    </h5>
                                    <h5><a style={{textDecoration:'none', color:"#393939"}}>Multi-Family Home</a></h5>
                                    <h5><a style={{textDecoration:'none', color:"#393939"}}>Townhouse</a></h5>
                                    <h5><a style={{textDecoration:'none', color:"#393939"}}>Duplex</a></h5>
                                    <h5><a style={{textDecoration:'none', color:"#393939"}}>Condominimum Unit</a></h5>
                                    <h5><a style={{textDecoration:'none', color:"#393939"}}>Raw Land</a></h5>
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




