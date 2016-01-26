'use strict';

import React, {Component, PropTypes} from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';
import _ from 'lodash';

import {Link} from 'react-router';
import config                                 from '../../config';
import {sendEvent}                          from '../../utils/googleAnalytics';

import {bindActionCreators} from 'redux';
import * as houseActions from '../../actions/house';

class HousePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.city = this.props.params.city;
        this.zipType = this.props.params.zipType;
        this.street = this.props.params.street.replace(/-+/g, '-');
        this.saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        this.props.getHouseIfNeeded(this.saleRent, this.city, this.zipType, this.street);
    }

    render() {
        let city = _.startCase(this.props.params.city.replace(/-+/g, ' '));
        let zipType = this.props.params.zipType;
        let saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
        return (
            <div style={{width:'100%'}}>
                {this.props.house &&
                <div>
                    <ul
                        style={{listStyle:'none', margin:'0px', padding:'0px'}}>
                        <li style={{display:'inline-block'}}>
                            <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                  to="/houses-for-sale">Houses
                                For Sale
                            </Link>
                            <span> / </span>
                        </li>
                        <li style={{display:'inline-block'}}>
                            <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                  to={`/houses-for-${saleRent}/${city.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                                {_.startCase(this.props.house.address.city)}
                            </Link>
                            <span> / </span>
                        </li>
                        <li style={{display:'inline-block'}}>
                            <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                  to={`/houses-for-${saleRent}/${city.toLowerCase().replace(/\s+/g, '-')}/${zipType}`}
                            >
                                {this.props.params.zipType}
                            </Link>
                            <span> / </span>
                        </li>
                        <li style={{display:'inline-block'}}>
                            <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}>
                                {this.props.house.address.street}
                            </span>
                        </li>
                    </ul>
                    <Grid>
                        <Cell
                            align='top'
                            col={6}>
                            <p>
                                {this.props.house.address.street + ' ' + this.props.house.address.city + ", " + this.props.house.address.state }
                            </p>
                            {this.props.house.type &&
                            <p>
                                {this.props.house.type}
                            </p>
                            }
                        </Cell>
                        <Cell
                            style={{textAlign:'right'}}
                            align='top'
                            col={6}>
                            <div>
                                MLS#: {this.props.house.mls}
                            </div>
                            <div>
                                ${this.props.house.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                            </div>
                            <br/>
                            <div>
                                Agent: {this.props.house.agent.split('_').map(init=>init[0].toUpperCase() + init.slice(1)).join(' ')}
                            </div>
                        </Cell>
                    </Grid>
                    < div >
                        {this.props.house.images && this.props.house.images.length &&

                        <img style={{width:'100%',height:'auto'}} src={this.props.house.images[0]} alt=""/>
                        }
                    </div>
                    <article style={{margin:'0px 10px'}}>
                        {this.props.house.description &&
                        <div>
                            <h5 >Description</h5>
                            <p>
                                {this.props.house.description}
                            </p>
                        </div>
                        }
                    </article>

                </div>

                }
            </div>

        );
    }
}
function mapStateToProps(state) {
    return state.house;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(houseActions, dispatch);
}
HousePage.need = [
    houseActions.getHouseIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(HousePage);




