'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';
import _ from 'lodash';

import {Link} from 'react-router';
import config                                 from '../../config';

import {bindActionCreators} from 'redux';
import * as housesActions from '../../actions/houses';
import ListingThumbCard from '../../components/ListingThumb/ListingThumbCard.js';

class ZipTypePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.city = this.props.params.city;
        this.zipType = this.props.params.zipType;
        this.saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
        this.props.getHousesIfNeeded(this.props.params,this.props.location);
    }

    render() {
        const zipOg = ogProps.zipPage;

        let city = _.startCase(this.props.params.city.replace(/-+/g, ' '));
        let saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        return (
            <div style={{width:'100%'}}>
                <Helmet
                    title={zipOg.title}
                    meta={[
                    {"name": "url", "content": `${zipOg.url}`},
                    {"name": "type", "content": `${appType}`},
                    {"name": "title", "content": `${zipOg.title}`},
                    {"name": "image", "content": `${fbImage}`},
                    {"name": "description", "content": `${zipOg.description}`},
                    {"property": "og:url", "content": `${zipOg.url}`},
                    {"property": "og:type", "content": `${appType}`},
                    {"property": "og:title", "content": `${zipOg.title}`},
                    {"property": "og:image", "content": `${fbImage}`},
                    {"property": "og:description", "content": `${zipOg.description}`}
                ]}
                />
                {this.props.params.street &&
                <div>
                    {this.props.children}
                </div>
                }

                {!this.props.params.street &&
                <div>
                    {this.props.houses &&
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
                                {saleRent=='sale' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}} to={`/houses-for-sale/${this.props.params.city}`}>
                                    {city}
                                </Link>}
                                {saleRent=='rent' && <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}} to={`/apartments-for-rent/${this.props.params.city}`}>
                                    {city}
                                </Link>}
                                <span> / </span>
                            </li>
                            <li style={{display:'inline-block'}}>
                            <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}>
                                {_.startCase(this.props.params.zipType)}
                            </span>
                            </li>
                        </ul>
                        <h1 style={{fontSize:28}}>
                            {city} Houses for Sale </h1>
                        <hr/>

                        <ul style={{listStyle:'none',padding:0}}>
                            {this.props.houses.map((house,index)=> {
                                return (
                                    <li style={{marginBottom:16,padding:0}}
                                        key={index}>
                                        <Link
                                            to={(saleRent=="sale"?"/houses-for-sale/":"/apartments-for-rent/")+house.address.city.trim().replace(/\s+/g,'-').toLowerCase()+'/'+house.address.zip+'/'+house.address.street.toLowerCase().replace(/[\.\,]/g,'').replace(/[\s+]/g,'-').replace(/-+/g,'-')}>
                                            <ListingThumbCard house={house}/></Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    }
                </div>}
            </div>

        );
    }
}
function mapStateToProps(state) {
    return state.houses;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(housesActions, dispatch);
}
ZipTypePage.need = [
    housesActions.getHousesIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(ZipTypePage);




