'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';

import {Link} from 'react-router';
import config                                 from '../../config';

import {bindActionCreators} from 'redux';
import * as housesActions from '../../actions/houses';
import ListingThumbCard from '../../components/ListingThumb/ListingThumbCard.js';

class ZipPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.city = this.props.params.city;
        this.zip = this.props.params.zip;
        this.saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
        this.props.getHousesIfNeeded(this.saleRent, this.city, this.zip);
    }

    render() {
        return (
            <div style={{width:'100%'}}>

                {this.props.params.street && <div>
                    {this.props.children}
                </div>}

                {!this.props.params.street && <div>
                    {this.props.houses &&
                    <ul style={{listStyle:'none'}}>
                        {this.props.houses.map(house=> {
                            return (
                                <li style={{marginBottom:16}}
                                    key={house.mls + house.city}>
                                    <Link
                                        to={this.props.location.pathname+'/'+house.address.street.replace(/[\.\,]/g,'').replace(/[\s+]/g,'-')}>
                                        <ListingThumbCard house={house}/></Link>
                                </li>
                            );
                        })}
                    </ul>
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
ZipPage.need = [
    housesActions.getHousesIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(ZipPage);




