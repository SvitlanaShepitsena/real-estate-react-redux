'use strict';


import {combineReducers} from 'redux';
import apiResponseFormatter from '../utils/apiResponseFormatter';

import {reducer as form} from 'redux-form';
import user from './user';
import articles from './article';
import zips from './zip';
import houses from './houses';

const rootReducer = combineReducers({
    form,
    zips,
    articles,
    houses,
    user
});

export default rootReducer;
