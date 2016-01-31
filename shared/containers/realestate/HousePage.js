'use strict';

import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {appUrl, fbImage, appType, ogProps} from "../../config.js";

import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';

/*Components*/
import * as houseActions from '../../actions/house';

class HousePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getHouseIfNeeded(this.props.params, this.props.location);
    }

    render() {
        var city = _.startCase(this.props.params.city.replace(/-+/g, ' '));
        var zipType = this.props.params.zipType;
        var street = this.props.params.street.replace(/-+/g, '-');

        var saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
        var house = this.props.house;

        if (house) {

            var price = this.props.house.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            var mls = 'MLS#:' + this.props.house.mls;

            var metaImage = house.images[0];
            var metaDescription = mls + ' | Check out and schedule a showing! ' + this.props.house.description;

            var metaTitleSale = (house.address.city + ' ' + "home for sale | " + house.address.street + ". ID:" + house.mls);
            var metaTitleRent = ("FOR RENT! | " + house.address.street + ", " + house.address.city + ", " + house.address.zip);

            var ogTitleSale = ("FOR SALE! ☆ "  + house.address.street + ", " + house.address.city + ", " + house.address.zip + " ☆ Re/Max 1st Class");
            var ogTitleRent = ("FOR RENT! ☆ "  + house.address.street + ", " + house.address.city + ", " + house.address.zip + " ☆ Re/Max 1st Class");

            var ogDescription = house.type + ' ' + mls + ' ✔ Check out and schedule a showing! ☏  ' + this.props.house.description;
        }

        return (
            <div>

                {this.props.house &&
                <div style={{width:'100%'}}>
                    {saleRent == 'sale' && house &&
                    <Helmet
                        title={metaTitleSale}
                        meta={[
                        {"name": "image", "content": `${metaImage}`},
                        {"name": "description", "content": `${metaDescription}`},
                        {"property": "og:title", "content": `${ogTitleSale}`},
                        {"property": "og:image", "content": `${metaImage}`},
                        {"property": "og:description", "content": `${ogDescription}`}
                    ]}
                    />
                    }
                    {saleRent == 'rent' && house &&
                    <Helmet
                        title={metaTitleRent}
                        meta={[
                        {"name": "image", "content": `${metaImage}`},
                        {"name": "description", "content": `${metaDescription}`},
                        {"property": "og:title", "content": `${ogTitleRent}`},
                        {"property": "og:image", "content": `${metaImage}`},
                        {"property": "og:description", "content": `${ogDescription}`}
                    ]}
                    />
                    }

                    {house &&
                    <div>
                        <ul
                            style={{listStyle:'none', margin:'0px', padding:'0px'}}>
                            <li style={{display:'inline-block'}}>
                                {saleRent == 'sale' &&
                                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                      to="/houses-for-sale">Houses
                                    For Sale
                                </Link>}
                                {saleRent == 'rent' &&
                                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                      to="/apartments-for-rent">Apartments
                                    For Rent
                                </Link>}
                                <span> / </span>
                            </li>
                            <li style={{display:'inline-block'}}>
                                {saleRent == 'sale' &&
                                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                      to={`/houses-for-sale/${city.toLowerCase().replace(/\s+/g,'-')}`}>
                                    {city}
                                </Link>}
                                {saleRent == 'rent' &&
                                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                      to={`/apartments-for-rent/${city.toLowerCase().replace(/\s+/g,'-')}`}>
                                    {city}
                                </Link>}
                                <span> / </span>
                            </li>
                            <li style={{display:'inline-block'}}>
                                {saleRent == 'sale' &&
                                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                      to={`/houses-for-sale/${city}/${zipType}`}>
                                    {zipType}

                                </Link>}
                                {saleRent == 'rent' &&
                                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                      to={`/apartments-for-rent/${city}/${zipType}`}>
                                    {zipType}
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
                                    <h1 style={{fontSize:22,marginBottom:5}}>
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
                                    </h1>
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
                                <img style={{width: 'auto',maxHeight:400,display:'block',margin:'0px auto'}}
                                     src={house.images[0]}
                                     alt={mls + " " + house.type}/>
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
                                                const val = house.exteriorDetails[extDetail];
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
                                                const val = house.interiorDetails[intDetail];
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
                                                const val = house.utilities[util];
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
                                                const val = house.publicFacts[publicFact];
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
                                                const val = house.taxes[tax];
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
                </div>}
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




