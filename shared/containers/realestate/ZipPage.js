'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';

import config                                 from '../../config';
import {sendEvent}                          from '../../utils/googleAnalytics';

import {bindActionCreators} from 'redux';
import * as housesActions from '../../actions/houses';
import ListingThumbCard from '../../components/ListingThumb/ListingThumbCard.js';

class ZipPage extends Component {
    constructor(props) {
        super(props);
    }

    handleQuizCardClick = (article) => {
        this.props.history.pushState(null, `/articles/${article.id}`, {
            embed: this.props.location.query.embed,
            assigneeId: this.props.location.query.assigneeId
        });

        sendEvent('article card', 'view details');
    };

    handleTabChange = (category) => {
        this.props.history.pushState(null, this.props.location.pathname, {
            ...this.props.location.query,
            category: category !== 'ALL' ? category : undefined
        });

        sendEvent('articles page', 'category', category);
    };

    handleStopSharing = () => {
        this.setState({
            linkToShare: '',
            isSharing: false
        });
    };

    componentDidMount() {
        this.city = this.props.params.city;
        this.zip = this.props.params.zip;
        this.saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        this.props.getHousesIfNeeded(this.saleRent, this.city, this.zip);
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props.route);
        console.log(this.props.routes);
    }

    render() {
        return (
            <div style={{width:'100%'}}>
                {this.props.houses &&
                <ul style={{listStyle:'none'}}>
                    {this.props.houses.map(house=> {
                        return (
                            <li style={{marginBottom:16}}
                                key={house.mls + house.city}
                                id={house.mls}
                                align='top'
                                col={12}>
                                <ListingThumbCard house={house}/>
                            </li>
                        );
                    })}
                </ul>
                }
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




