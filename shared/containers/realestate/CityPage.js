'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';

import {Link} from 'react-router';
import TypeLink from './TypeLink';

import config                                 from '../../config';

import {bindActionCreators} from 'redux';
import * as zipsActions from '../../actions/zips';

class cityPage extends Component {
    static contextTypes = {i18n: PropTypes.object};

    componentDidMount() {
        this.props.getZIPsIfNeeded();
    }

    componentWillReceiveProps(nextProps) {
        const zip = nextProps.zips.filter(zip=>zip.key.trim().toLowerCase() === this.props.params.city)[0];
        this.zips = _.filter(_.keys(zip), zip=>zip.length === 5);

    }

    render() {
        let city = this.props.params.city;
        city = city.charAt(0).toUpperCase() + city.slice(1);
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
                    <h4>{city} Listings for Sale by Zip Code</h4>
                    <hr/>
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

                    <h4>{city} Listings for Sale by Property Type</h4>
                    <hr/>
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




