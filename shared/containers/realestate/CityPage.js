'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';
import _ from 'lodash';

import {Link} from 'react-router';
import TypeLink from './TypeLink';

import config                                 from '../../config';

import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions, CardText} from 'react-mdl/lib/Card';

import {bindActionCreators} from 'redux';
import * as zipsActions from '../../actions/zips';

class cityPage extends Component {
    static contextTypes = {i18n: PropTypes.object};

    componentDidMount() {
        this.props.getZIPsIfNeeded();
    }

    componentWillReceiveProps(nextProps) {
        const zip = nextProps.zips.filter(zip=>zip.key == (this.props.params.city));
        this.zips = _.filter(_.keys(zip[0]), zip=>zip.length === 5);

    }

    render() {
        let city = _.startCase(this.props.params.city.replace(/-+/g, ' '));

        let saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        return (
            <div>
                {this.props.params.zipType &&
                <div>
                    {this.props.children}
                </div>
                }

                {!this.props.params.zipType &&
                <div>
                    <ul
                        style={{listStyle:'none', margin:'0px', padding:'0px'}}>
                        <li style={{display:'inline-block'}}>
                            <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}} to="/houses-for-sale">Houses
                                For Sale
                            </Link>
                            <span> / </span>
                        </li>
                        <li style={{display:'inline-block'}}>
                            <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}> {_.startCase(city)}
                            </span>
                        </li>
                    </ul>
                    <h1 style={{fontSize:28}}>
                        {_.startCase(city)} Houses for Sale </h1>
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
                                    <ul
                                        style={{listStyle:'none', margin:'0px', padding:'0px'}}>
                                        {this.zips && this.zips.map(zip=> {
                                            return (
                                                <li key={zip} style={{padding:0}}>
                                                    <h5 style={{marginTop:0}}>
                                                        <Link
                                                            to={`/houses-for-${saleRent}/${city.toLowerCase().replace(/\s+/g, '-')}/${zip}`}
                                                            style={{textDecoration:'none', color:'#393939',fontSize:18}}
                                                        >
                                                            {zip}
                                                        </Link>
                                                    </h5>
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

                                    <h5 style={{marginTop:0}}>
                                        <Link to={this.props.location.pathname}
                                              style={{color: '#393939',textDecoration:'none'}}
                                              type="Single Family Homes">
                                            Single Family Home
                                        </Link>
                                    </h5>
                                    <h5 style={{marginTop:0}}>
                                        <a style={{textDecoration:'none', color:"#393939"}}>Multi-Family Home</a></h5>
                                    <h5 style={{marginTop:0}}>
                                        <a style={{textDecoration:'none', color:"#393939"}}>Townhouse</a></h5>
                                    <h5 style={{marginTop:0}}>
                                        <a style={{textDecoration:'none', color:"#393939"}}>Duplex</a></h5>
                                    <h5 style={{marginTop:0}}>
                                        <a style={{textDecoration:'none', color:"#393939"}}>Condominimum Unit</a></h5>
                                    <h5 style={{marginTop:0}}>
                                        <a style={{textDecoration:'none', color:"#393939"}}>Raw Land</a></h5>
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




