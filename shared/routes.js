'use strict';

import React     from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';

import App from './containers/App.js';

import AppLayout from './containers/AppLayoutSmart.js';
import AsideLayout from './components/MainLayout/AsideLayout';

import UserProfilePageContainer from './containers/pages/UserProfilePage';
import HousesForSalePageContainer from './containers/pages/HousesForSalePage.js';
import HousesForRentPageContainer from './containers/pages/HousesForRentPage.js';
import ArticlesPageContainer from './containers/pages/ArticlesPage.js';
import TermsOfUsePageContainer from './containers/pages/TermsOfUsePage.js';
import PrivacyPolicyPageContainer from './containers/pages/PrivacyPolicyPage.js';
import ContactsPageContainer from './containers/pages/ContactsPage.js';
import HomePage from './containers/pages/HomePage';
import AboutPageContainer from './containers/pages/AboutPage';
import LoginPageContainer from './containers/pages/LoginPage.js';

import CityPage from './containers/realestate/CityPage';
import ZipTypePage from './containers/realestate/ZipTypePage';

import HousePage from './containers/realestate/HousePage';

export default (
    <Route component={App}>
        <Route component={AppLayout}>
            <Route component={HomePage} path='/'/>
            <Route component={AsideLayout}>
                <Route component={HousesForSalePageContainer} path='/houses-for-sale'>
                    <Route component={CityPage} path=':city'>
                        <Route component={ZipTypePage} path=':zipType'>
                            <Route component={HousePage} path=':street'/>
                        </Route>
                    </Route>
                </Route>
                <Route component={HousesForRentPageContainer} path='/apartments-for-rent'>
                    <Route component={CityPage} path=':city'>
                        <Route component={ZipTypePage} path=':zipType'>
                            <Route component={HousePage} path=':street'/>
                        </Route>
                    </Route>
                </Route>
                <Route component={ArticlesPageContainer} path='/blog'/>
                <Route component={TermsOfUsePageContainer} path='/terms-of-use'/>
                <Route component={PrivacyPolicyPageContainer} path='/privacy-policy'/>
                <Route component={AboutPageContainer} path='/about'/>
                <Route component={ContactsPageContainer} path='/contacts'/>
                <Route component={LoginPageContainer} path='/login'/>
                <Route component={UserProfilePageContainer} path='/profile'/>
            </Route>
        </Route>
    </Route>
);
