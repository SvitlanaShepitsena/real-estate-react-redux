import React, {Component, PropTypes} from 'react';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import {Footer} from 'react-mdl/lib/Footer';
import {Link} from 'react-router';

import AppBar      from '../AppBar/AppBar.js';
import Footer        from '../../containers/FooterSmart.js';

if (process.env.BROWSER) {
    require('./MainLayout.less');
}

export default class MainLayout extends Component {
    static contextTypes = {i18n: React.PropTypes.object};

    static propTypes = {
        showFooter: PropTypes.bool,
        footerLinks: PropTypes.object
    };

    toggleDrawer(e) {
        document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
        let dimmer = document.querySelector('.mdl-layout__obfuscator');
        dimmer.classList.remove('is-visible');

    }

    render() {
        const {l} = this.context.i18n;

        return (
            <Layout fixedHeader style={{minHeight: '500px',height:"auto", position: 'relative'}}>
                <AppBar />
                <Drawer onClick={this.toggleDrawer.bind(this)}>
                    <Navigation>
                        <Link to="/" className='MainLayout__drawer-nav-link'>{l('home')}</Link>
                        <Link to="/about" className='MainLayout__drawer-nav-link'>{l('about us')}</Link>
                        <Link to="/tutorials" className='MainLayout__drawer-nav-link'>{l('tutorials')}</Link>
                        <Link to="/projects" className='MainLayout__drawer-nav-link'>{l('projects')}</Link>
                        <Link to="/contacts" className='MainLayout__drawer-nav-link'>{l('contact')}</Link>
                    </Navigation>
                </Drawer>
                <div>
                    {this.props.children}
                </div>
                <div className="mdl-layout-spacer"></div>
                <Footer />
            </Layout>
        );
    }
}
