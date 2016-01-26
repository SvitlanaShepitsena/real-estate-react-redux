'use strict';


import {combineReducers} from 'redux';
import apiResponseFormatter from '../utils/apiResponseFormatter';

import {reducer as form} from 'redux-form';
import user from './user';
import articles from './article';
import cities from './cities';
import cityInfo from './cityInfo';
import houses from './houses';
import house from './house';

const rootReducer = combineReducers({
    form,
    cities,
    cityInfo,
    articles,
    houses,
    house,
    user
});

export default rootReducer;
