'use strict';

import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {appUrl, fbImage, appType, ogProps} from "../../config.js";

import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';

import {Link} from 'react-router';
import {connect}                   from 'react-redux';
import _ from 'lodash';

import {bindActionCreators} from 'redux';
import * as houseActions from '../../actions/house';

class HousePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.city = this.props.params.city;
        this.state = this.props.params.state;
        this.zipType = this.props.params.zipType;
        this.street = this.props.params.street.replace(/-+/g, '-');
        this.saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        this.props.getHouseIfNeeded(this.saleRent, this.city, this.zipType, this.street);
    }

    render() {
        const house = this.props.house;
        let city = _.startCase(this.props.params.city.replace(/-+/g, ' '));
        let zipType = this.props.params.zipType;
        let street = this.props.params.street.replace(/-+/g, '-');

        let saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
        const cityOg = ogProps.cityPage;

        let saleTitle = city + ", " + zipType + ", " + street;
        let rentTitle = "Rent Title";

        return (
            <div style={{width:'100%'}}>
                {saleRent == 'sale' &&
                <Helmet
                    title={saleTitle}
                    meta={[
                        {"name": "url", "content": `${cityOg.url}`},
                        {"name": "type", "content": `${appType}`},
                        {"name": "title", "content": `${saleTitle}`},
                        {"name": "image", "content": `${fbImage}`},
                        {"name": "description", "content": `${cityOg.description}`},
                        {"property": "og:url", "content": `${cityOg.url}`},
                        {"property": "og:type", "content": `${appType}`},
                        {"property": "og:title", "content": `${saleTitle}`},
                        {"property": "og:image", "content": `${fbImage}`},
                        {"property": "og:description", "content": `${cityOg.description}`}
                    ]}
                />
                }
                {saleRent == 'rent' &&
                <Helmet
                    title={rentTitle}
                    meta={[
                        {"name": "url", "content": `${cityOg.url}`},
                        {"name": "type", "content": `${appType}`},
                        {"name": "title", "content": `${rentTitle}`},
                        {"name": "image", "content": `${fbImage}`},
                        {"name": "description", "content": `${cityOg.description}`},
                        {"property": "og:url", "content": `${cityOg.url}`},
                        {"property": "og:type", "content": `${appType}`},
                        {"property": "og:title", "content": `${saleTitle}`},
                        {"property": "og:image", "content": `${fbImage}`},
                        {"property": "og:description", "content": `${cityOg.description}`}
                    ]}
                />
                }

                {house &&
                <div>
                    <ul
                        style={{listStyle:'none', margin:'0px', padding:'0px'}}>
                        <li style={{display:'inline-block'}}>
                            {saleRent == 'sale' &&
                            <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}} to="/houses-for-sale">Houses
                                For Sale
                            </Link>}
                            {saleRent == 'rent' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                                         to="/apartments-for-rent">Apartments
                                For Rent
                            </Link>}
                            <span> / </span>
                        </li>
                        <li style={{display:'inline-block'}}>
                            {saleRent == 'sale' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                                         to={`/houses-for-sale/${this.props.params.city}`}>
                                {city}
                            </Link>}
                            {saleRent == 'rent' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                                         to={`/apartments-for-rent/${this.props.params.city}`}>
                                {city}
                            </Link>}
                            <span> / </span>
                        </li>
                        <li style={{display:'inline-block'}}>
                            {saleRent == 'sale' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                                         to={`/houses-for-sale/${this.props.params.city}/${this.props.params.zipType}`}>
                                {this.props.params.zipType}

                            </Link>}
                            {saleRent == 'rent' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                                         to={`/apartments-for-rent/${this.props.params.city}/${this.props.params.zipType}`}>
                                {this.props.params.zipType}
                            </Link>}
                            <span> / </span>
                        </li>
                        <li style={{display:'inline-block'}}>
                            {house.address.street &&
                            <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}>
                                {house.address.street}
                            </span>
                            }
                            {house.mls &&
                            <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}>
                             {" - MLS#" + house.mls  }
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
                                    {house.address.street &&
                                    <span>{house.address.street}</span>
                                    }
                                    <br/>

                                    {house.address.city &&
                                    <span> {house.address.city + ", "} </span>
                                    }

                                    {house.address.state &&
                                    <span> {house.address.state } </span>
                                    }
                                </h4>
                                {house.type &&
                                <p> {house.type} </p>
                                }
                            </li>
                            <li style={{display:'block',float:'right', padding:'0px 16px'}}>
                                {house.price &&
                                <h4> ${house.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} </h4>
                                }
                                {house.shortSale &&
                                <div> Short Sale </div>
                                }
                                {house.mls &&
                                <div> MLS#: {house.mls} </div>
                                }
                                {house.year &&
                                <div> Year: {house.year} </div>
                                }
                            </li>
                        </ul>
                        <div>
                            {house.images && house.images.length &&
                            <img style={{width:'100%',height:'auto'}} src={house.images[0]} alt=""/>
                            }
                        </div>
                        <article style={{margin:'0px 10px'}}>
                            {house.description &&
                            <div>
                                <h5 >Description</h5>
                                <p> {house.description} </p>
                            </div>
                            }
                        </article>
                        <article style={{margin:'0px 10px', paddingBottom:16, fontSize:13, width:"100%"}}>
                            <h5>Key Facts:</h5>
                            <Grid>
                                <Cell
                                    col={6}
                                    phone={1}
                                >
                                    {house.type &&
                                    <p> Type: {house.type} </p>
                                    }

                                    {house.exteriorDetails && house.exteriorDetails['Lot Size'] &&
                                    <p> Lot Size: {house.exteriorDetails['Lot Size']} </p>
                                    }
                                    {house.price &&
                                    <p> Price: ${house.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} </p>
                                    }
                                    {house.year &&
                                    <p> Year Built: {house.year} </p>
                                    }
                                </Cell>
                                <Cell
                                    col={6}
                                    phone={1}
                                >
                                    {house.beds &&
                                    <p> Beds: {house.beds} </p>
                                    }
                                    {house.bath &&
                                    <p> Baths: {house.bath} </p>
                                    }
                                    {house.exteriorDetails && house.exteriorDetails['Parking'] &&
                                    <p> Parking: {house.exteriorDetails['Parking']} </p>
                                    }
                                </Cell>

                            </Grid>
                        </article>
                        {
                            house.exteriorDetails &&
                            <article style={{margin:'0px 10px', paddingBottom:16, fontSize:13}}>
                                <h5>Exterior Details</h5>
                                <ul style={{fontSize: 16}}>
                                    {
                                        Object.keys(house.exteriorDetails).map(extDetail => {
                                            console.log(extDetail);
                                            const val = house.exteriorDetails[extDetail];
                                            console.log(val);
                                            return (
                                                <li key={extDetail}>
                                                    <span>
                                                        {extDetail + ": "}
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
                            house.interiorDetails &&
                            <article style={{margin:'0px 10px', paddingBottom:16, fontSize:13}}>
                                <h5>Interior Details</h5>
                                <ul style={{fontSize: 16}}>
                                    {
                                        Object.keys(house.interiorDetails).map(intDetail => {
                                            console.log(intDetail);
                                            const val = house.interiorDetails[intDetail];
                                            console.log(val);
                                            return (
                                                <li key={intDetail}>
                                                    <span>
                                                        {intDetail + ": "}
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
                            house.utilities &&
                            <article style={{margin:'0px 10px', paddingBottom:16, fontSize:13}}>
                                <h5>Utilities</h5>
                                <ul style={{fontSize: 16}}>
                                    {
                                        Object.keys(house.utilities).map(util => {
                                            console.log(util);
                                            const val = house.utilities[util];
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
                            house.publicFacts &&
                            <article style={{margin:'0px 10px', paddingBottom:16, fontSize:13}}>
                                <h5>Public Facts</h5>
                                <ul style={{fontSize: 16}}>
                                    {
                                        Object.keys(house.publicFacts).map(publicFact => {
                                            console.log(publicFact);
                                            const val = house.publicFacts[publicFact];
                                            console.log(val);
                                            return (
                                                <li key={publicFact}>
                                                    <span>
                                                        {publicFact + ": "}
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
                            house.taxes &&
                            <article style={{margin:'0px 10px', paddingBottom:16, fontSize:13}}>
                                <h5>Taxes</h5>
                                <ul style={{fontSize: 16}}>
                                    {
                                        Object.keys(house.taxes).map(tax => {
                                            console.log(tax);
                                            const val = house.taxes[tax];
                                            console.log(val);
                                            return (
                                                <li key={tax}>
                                                    <span>
                                                        {tax + ": "}
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
                            house.agent &&
                            <article style={{margin: '0px 10px', paddingBottom: 16}}>
                                <p> Listing
                                    Broker: {house.agent.split('_').map(init=>init[0].toUpperCase() + init.slice(1)).join(' ')}
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




