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
        const house = this.props.house;
        return (
            <div style={{width:'100%'}}>
                {this.props.house &&
                <div>
                    <ul
                        style={{listStyle:'none', margin:'0px', padding:'0px'}}>
                        <li style={{display:'inline-block'}}>
                            {saleRent=='sale' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}} to="/houses-for-sale">Houses
                                For Sale
                            </Link>}
                            {saleRent=='rent' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}} to="/apartments-for-rent">Apartments
                                For Rent
                            </Link>}
                            <span> / </span>
                        </li>
                        <li style={{display:'inline-block'}}>
                            {saleRent=='sale' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}} to={`/houses-for-sale/${this.props.params.city}`}>
                                {city}
                            </Link>}
                            {saleRent=='rent' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}} to={`/apartments-for-rent/${this.props.params.city}`}>
                                {city}
                            </Link>}
                            <span> / </span>
                        </li>
                        <li style={{display:'inline-block'}}>
                            {saleRent=='sale' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}} to={`/houses-for-sale/${this.props.params.city}/${this.props.params.zipType}`}>
                                {this.props.params.zipType}

                            </Link>}
                            {saleRent=='rent' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}} to={`/apartments-for-rent/${this.props.params.city}/${this.props.params.zipType}`}>
                                {this.props.params.zipType}
                            </Link>}
                            <span> / </span>
                        </li>
                        <li style={{display:'inline-block'}}>
                            {this.props.house.address.street &&
                            <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}>
                                {this.props.house.address.street}
                            </span>
                            }
                            {this.props.house.mls &&
                            <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}>
                             {" - MLS#" + this.props.house.mls  }
                            </span>
                            }
                        </li>
                    </ul>
                    <br/>
                    <Card shadow={0} style={{width:'100%'}}>
                        <ul style={{listStyle:'none',padding:0}}>
                            <li style={{display:'block',float:'left', padding:'0px 16px'}}>
                                {/*=Address*/}
                                <h4 style={{fontSize:22,marginBottom:5}}>
                                    {this.props.house.address.street &&
                                    <span>{this.props.house.address.street}</span>
                                    }
                                    <br/>

                                    {this.props.house.address.city &&
                                    <span> {this.props.house.address.city + ", "} </span>
                                    }

                                    {this.props.house.address.state &&
                                    <span> {this.props.house.address.state } </span>
                                    }
                                </h4>
                                {this.props.house.type &&
                                <p> {this.props.house.type} </p>
                                }
                            </li>
                            <li style={{display:'block',float:'right', padding:'0px 16px'}}>
                                {this.props.house.price &&
                                <h4> ${this.props.house.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} </h4>
                                }
                                {this.props.house.shortSale &&
                                <div> Short Sale </div>
                                }
                                {this.props.house.mls &&
                                <div> MLS#: {this.props.house.mls} </div>
                                }
                                {this.props.house.year &&
                                <div> Year: {this.props.house.year} </div>
                                }
                            </li>
                        </ul>
                        <div>
                            {this.props.house.images && this.props.house.images.length &&
                            <img style={{width:'100%',height:'auto'}} src={this.props.house.images[0]} alt=""/>
                            }
                        </div>
                        <article style={{margin:'0px 10px'}}>
                            {this.props.house.description &&
                            <div>
                                <h5 >Description</h5>
                                <p> {this.props.house.description} </p>
                            </div>
                            }
                        </article>
                        <article style={{margin:'0px 10px', paddingBottom:16, fontSize:13}}>
                            <h5>Key Facts:</h5>
                            {this.props.house.type &&
                            <p> Type: {this.props.house.type} </p>
                            }

                            {this.props.house.exteriorDetails && this.props.house.exteriorDetails['Lot Size'] &&
                            <p> Lot Size: {this.props.house.exteriorDetails['Lot Size']} </p>
                            }
                            {this.props.house.price &&
                            <p> Price: ${this.props.house.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} </p>
                            }
                            {this.props.house.year &&
                            <p> Year Built: {this.props.house.year} </p>
                            }
                            {this.props.house.beds &&
                            <p> Beds: {this.props.house.beds} </p>
                            }
                            {this.props.house.bath &&
                            <p> Baths: {this.props.house.bath} </p>
                            }
                            {this.props.house.exteriorDetails && this.props.house.exteriorDetails['Parking'] &&
                            <p> Parking: {this.props.house.exteriorDetails['Parking']} </p>
                            }
                        </article>
                        {
                            this.props.house.exteriorDetails &&
                            <article style={{margin:'0px 10px', paddingBottom:16, fontSize:13}}>
                                <h5>Exterior Details</h5>
                                {this.props.house.exteriorDetails['Architecture'] &&
                                <p> Architecture: {this.props.house.exteriorDetails['Architecture']} </p>
                                }
                                {this.props.house.exteriorDetails['Building Units'] &&
                                <p> Building Units: {this.props.house.exteriorDetails['Building Units']} </p>
                                }
                                {this.props.house.exteriorDetails['Features'] &&
                                <p> Features: {this.props.house.exteriorDetails['Features']} </p>
                                }
                                {this.props.house.exteriorDetails['Lot Features'] &&
                                <p> Lot Features: {this.props.house.exteriorDetails['Lot Features']} </p>
                                }
                                {this.props.house.exteriorDetails['Lot Size'] &&
                                <p> Lot Size: {this.props.house.exteriorDetails['Lot Size']} </p>
                                }
                                {this.props.house.exteriorDetails['Parking'] &&
                                <p> Parking: {this.props.house.exteriorDetails['Parking']} </p>
                                }
                                {this.props.house.exteriorDetails['Roof'] &&
                                <p> Roof: {this.props.house.exteriorDetails['Roof']} </p>
                                }
                            </article>
                        }
                        {
                            this.props.house.interiorDetails &&
                            <article style={{margin:'0px 10px', paddingBottom:16, fontSize:13}}>

                                <h5>Interior Details</h5>
                                {this.props.house.interiorDetails['Appliances'] &&
                                <p> Appliances: {this.props.house.interiorDetails['Appliances']} </p>
                                }
                                {this.props.house.interiorDetails['Basement'] &&
                                <p> Basement: {this.props.house.interiorDetails['Basement']} </p>
                                }
                                {this.props.house.interiorDetails['Master Bedroom'] &&
                                <p> Master Bedroom: {this.props.house.interiorDetails['Master Bedroom']} </p>
                                }
                                {this.props.house.interiorDetails['Bedroom 2'] &&
                                <p> Bedroom 2: {this.props.house.interiorDetails['Bedroom 2']} </p>
                                }
                                {this.props.house.interiorDetails['Bedroom 3'] &&
                                <p> Bedroom 3: {this.props.house.interiorDetails['Bedroom 3']} </p>
                                }
                                {this.props.house.interiorDetails['Dining Area'] &&
                                <p> Dining Area: {this.props.house.interiorDetails['Dining Area']} </p>
                                }
                                {this.props.house.interiorDetails['Dining Room'] &&
                                <p> Dining Room: {this.props.house.interiorDetails['Dining Room']} </p>
                                }
                                {this.props.house.interiorDetails['Kitchen'] &&
                                <p> Kitchen: {this.props.house.interiorDetails['Kitchen']} </p>
                                }
                                {this.props.house.interiorDetails['Laundry Room'] &
                                <p> Laundry Room: {this.props.house.interiorDetails['Laundry Room']} </p>
                                }
                                {this.props.house.interiorDetails['Window Type'] &&
                                <p> Window Type: {this.props.house.interiorDetails['Window Type']} </p>
                                }
                            </article>
                        }
                        {
                            this.props.house.utilities &&
                            <article style={{margin:'0px 10px', paddingBottom:16, fontSize:13}}>
                                <h5>Utilities</h5>
                                <ul style={{fontSize: 16}}>
                                    {
                                        Object.keys(this.props.house.utilities).map(util => {
                                            console.log(util);
                                            const val = this.props.house.utilities[util];
                                            console.log(val);
                                            return (
                                                <li key={util}>
                                                    <span>
                                                        {util + ": "}
                                                    </span>
                                                    <span>
                                                        {val}
                                                    </span>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </article>
                        }
                        {
                            this.props.house.taxes &&
                            <article style={{margin:'0px 10px', paddingBottom:16, fontSize:13}}>
                                <h5>Taxes</h5>
                                {this.props.house.taxes['Tax Amount'] &&
                                <p> Tax Amount: {this.props.house.taxes['Tax Amount']} </p>
                                }
                                {this.props.house.taxes['Tax Year'] &&
                                <p> Tax Year: {this.props.house.taxes['Tax Year']} </p>
                                }
                            </article>
                        }

                        {
                            this.props.house.agent &&
                            <article style={{margin: '0px 10px', paddingBottom: 16}}>
                                <p> Listing
                                    Broker: {this.props.house.agent.split('_').map(init=>init[0].toUpperCase() + init.slice(1)).join(' ')}
                                </p>
                            </article>
                        }

                    </Card>
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




