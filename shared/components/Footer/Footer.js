import React, {Component, PropTypes} from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Footer, FooterSection, FooterLinkList} from 'react-mdl/lib/Footer';
import {Link} from 'react-router';

import Icon from './../common/Icon/Icon.js';
import ShareDialog from '../../containers/ShareDialogSmart.js';

if (process.env.BROWSER) {
    require('./Footer.less');
}

export default class Footer extends Component {
    static contextTypes = {i18n: PropTypes.object};

    render() {
        const {l} = this.context.i18n;
        const {links, linkToShare, showShareDialog, onLinkClick, onShareClick, onShareClose} = this.props;

        return (
            <Footer size="mini">
                <FooterSection type="left" logo="Title">
                    <FooterLinkList>
                        <a href="#">Help</a>
                        <a href="#">Privacy & Terms</a>
                    </FooterLinkList>
                </FooterSection>
            </Footer>
        );
    }
}
