'use strict';

import React, {Component, PropTypes} from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';

import config                                 from '../../config';
import {sendEvent}                          from '../../utils/googleAnalytics';

import {bindActionCreators} from 'redux';
import * as houseActions from '../../actions/house';

class HousePage extends Component {
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

    componentDidMount() {
        this.city = this.props.params.city;
        this.zip = this.props.params.zip;
        this.street = this.props.params.street.toLowerCase();
        this.saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        this.props.getHouseIfNeeded(this.saleRent, this.city, this.zip, this.street);
    }

    render() {
        return (
            <Card style={{width:'100%'}} shadow={0}>
                {this.props.house &&
                <div>
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
            </Card>

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




