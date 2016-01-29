import React, {Component, PropTypes} from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';

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
            <footer className='Footer'>
                <ShareDialog
                    title={l('Share this page')}
                    isOpen={showShareDialog}
                    linkToShare={linkToShare}
                    onRequestClose={onShareClose}
                />
                <Grid>
                    <Cell col={3}>
                        <div className="Footer__menu">
                            <h3 className="Footer__menu-header">Re/Max 1st Class</h3>
                            <ul className="Footer__address">
                                <li>
                                    <span >4023 W. Church St.</span>
                                </li>
                                <li>
                                    <span>Skokie, IL, 60076</span>
                                </li>
                                <li>
                                    <span>
                                        Phone: (847) 674-9797
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Fax: (847) 674-0411
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </Cell>
                    <Cell col={3}>
                        <div className="Footer__menu">
                            <h3 className="Footer__menu-header">{l('Keep in touch')}</h3>
                            <ul className="Footer__menu-items">
                                <li>
                                    <a
                                        href={links.facebook}
                                        target='_blank'
                                        onClick={onLinkClick.bind(null, 'facebook')}>
                                        {l('Facebook')}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={links.google}
                                        target='_blank'
                                        onClick={onLinkClick.bind(null, 'google')}>
                                        Google Plus
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={links.twitter}
                                        target='_blank'
                                        onClick={onLinkClick.bind(null, 'twitter')}>
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={links.linkedin}
                                        target='_blank'
                                        onClick={onLinkClick.bind(null, 'linkedin')}>
                                        Linkedin
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Cell>
                    <Cell col={3}>
                        <div className="Footer__menu">
                            <h3 className="Footer__menu-header">{l('Do you like our company?')}</h3>
                            <ul className="Footer__menu-items">
                                <li>
                                    <Link to="/about">{l('About us')}</Link>
                                </li>
                                <li>
                                    <a
                                        onClick={onShareClick}>
                                        {l('Share this page')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Cell>
                    <Cell col={3}>
                        <div className="Footer__menu">
                            <h3 className="Footer__menu-header">Website rules</h3>
                            <ul className="Footer__menu-items">
                                <li>
                                    <Link to="/terms-of-use">{l('Terms of use')}</Link>
                                </li>
                                <li>
                                    <Link to="/privacy-policy">{l('Privacy policy')}</Link>
                                </li>
                            </ul>
                        </div>
                    </Cell>
                </Grid>
            </footer>
        );
    }
}
