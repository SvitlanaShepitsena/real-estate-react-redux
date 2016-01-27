import React, {Component, PropTypes} from 'react';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';
import Button      from 'react-mdl/lib/Button';
import Icon      from 'react-mdl/lib/Icon';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Link} from 'react-router';
import ContactAgent from '../ContactAgent/ContactAgentList.js';

if (process.env.BROWSER) {
    require('./AsideLayout.less');
}
export default class AsideLayout extends Component {

    render() {
        return (
            <div className="AsideLayout">
                <Grid>
                    <Cell
                        col={8}
                        phone={12}>
                        {this.props.children}
                    </Cell>
                    <Cell
                        col={4}
                        phone={12}>
                        <aside style={{padding:"0px 8px"}}>
                            <div style={{textAlign:'center'}}>
                                <ContactAgent/>
                            </div>
                        </aside>
                    </Cell>
                </Grid>

            </div>
        );
    }
}
