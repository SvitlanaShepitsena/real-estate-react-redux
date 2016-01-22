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
import ProjectsPageContainer from './containers/pages/ProjectsPage.js';
import ContactsPageContainer from './containers/pages/ContactsPage.js';
import HomePage from './containers/pages/HomePage';
import AboutPageContainer from './containers/pages/AboutPage';
import LoginPageContainer from './containers/pages/LoginPage.js';

export default (
    <Route component={App}>
        <Route component={AppLayout}>
            <Route component={HomePage} path='/'/>
            <Route component={AsideLayout}>
                <Route component={HousesForSalePageContainer} path='/houses-for-sale'/>
                <Route component={HousesForRentPageContainer} path='/houses-for-rent'/>
                <Route component={ArticlesPageContainer} path='/blog'/>
                <Route component={ProjectsPageContainer} path='/projects'/>
                <Route component={ContactsPageContainer} path='/contacts'/>
                <Route component={LoginPageContainer} path='/login'/>
                <Route component={UserProfilePageContainer} path='/profile'/>
                <Route component={AboutPageContainer} path='/about'/>
            </Route>
        </Route>
    </Route>
);
