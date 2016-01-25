import React, {Component, PropTypes} from 'react';

import MainLayout from '../components/MainLayout/MainLayout.js';

import {footerLinks} from '../config';

export default class AppLayoutSmartContainer extends Component {

    render() {

        return (
            <MainLayout
                showWelcomeScreen={false}
                showFooter={true}>
                {this.props.children}
            </MainLayout>
        );
    }
}
