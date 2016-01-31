import React, {Component, PropTypes} from 'react';
import {cx} from 'classnames';
import {Link} from 'react-router';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';

import AppBarUser from '../AppBarUser/AppBarUser';
import LoginDialog    from '../../containers/LoginDialogSmart';
import LanguageSwitch from '../../containers/LanguageSwitchSmart.js';
import IconButton from '../../../node_modules/react-mdl/lib/IconButton';
import {connect} from 'react-redux';

if (process.env.BROWSER) {
    require('./AppBar.less');
}

const LOGO_SRC = 'http://res.cloudinary.com/svitlana/image/upload/v1453490978/remax-1st-class-logo_gjc14e.png';

class AppBar extends Component {
    static contextTypes = {i18n: React.PropTypes.object};

    static propTypes = {
        title: PropTypes.string,
        fixOnScroll: PropTypes.bool,
        scrollOffset: PropTypes.number,
    };

    static defaultProps = {
        title: '',
        fixOnScroll: true,
        scrollOffset: 0
    };

    state = {
        isLoggingIn: false
    };

    handleLogin = () => {
        this.setState({
            isLoggingIn: true
        });
    };

    handleLoginDialogClose = () => {
        this.setState({
            isLoggingIn: false
        });
    };

    renderCompanyLogo = () => {
        return (
            <div>
                <Link to="/" style={{color:'white',textDecoration:'none'}}>
                    <img alt="Re/Max 1st Class Logo" src={LOGO_SRC} className='AppBar__logo'/>
                    <div className="AppBar__title">
                        Re/Max 1st Class
                    </div>
                </Link>
            </div>
        )

    };

    render() {
        const {l} = this.context.i18n;
        const user = this.props.user ? this.props.user.profile : null;

        const {isLoggingIn} = this.state;

        return (
            <Header title={this.renderCompanyLogo()} className="AppBar">
                <LoginDialog
                    isOpen={isLoggingIn}
                    onRequestClose={this.handleLoginDialogClose}
                />
                <Navigation className="AppBar__right">
                    <div>
                        <Link to="/houses-for-sale" className='AppBar__menu-item-nav'> houses for sale </Link>
                    </div>
                    <div >
                        <Link to="/apartments-for-rent" className='AppBar__menu-item-nav'> apartments for rent </Link>
                    </div>
                    {/*
                     <div >
                     <Link to="/blog" className='AppBar__menu-item-nav'> blog </Link>
                     </div>
                     */}
                    <div>
                        <Link to="/about" className='AppBar__menu-item-nav'> about us </Link>
                    </div>
                    <div >
                        <Link to="/contacts" className='AppBar__menu-item-nav'> contact </Link>
                    </div>
                    {/*
                     <LanguageSwitch className='AppBar__lang'/>
                     */}
                </Navigation>
                {/*
                 <AppBarUser user={user} handleLogin={this.handleLogin}/>
                 */}
            </Header>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user

    };
}

export default connect(mapStateToProps)(AppBar);

