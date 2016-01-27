import React, {Component, PropTypes} from 'react';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import {Link} from 'react-router';

import AppBar      from '../AppBar/AppBar.js';
import Footer        from '../../containers/FooterSmart.js';

if (process.env.BROWSER) {
    require('./MainLayout.less');
}

export default class MainLayout extends Component {

    toggleDrawer(e) {
        document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
        let dimmer = document.querySelector('.mdl-layout__obfuscator');
        dimmer.classList.remove('is-visible');

    }

    render() {

        return (
            <Layout fixedHeader className="MainLayout">
                <AppBar />
                <Drawer onClick={this.toggleDrawer.bind(this)}>
                    <Navigation>
                        <Link to="/" className='MainLayout__drawer-nav-link'>home</Link>
                        <Link to="/houses-for-sale" className='MainLayout__drawer-nav-link'> houses for sale </Link>
                        <Link to="/apartments-for-rent" className='MainLayout__drawer-nav-link'> apartments for
                            rent </Link>
                        <Link to="/about" className='MainLayout__drawer-nav-link'>about us</Link>
                        <Link to="/contacts" className='MainLayout__drawer-nav-link'>contact</Link>
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
