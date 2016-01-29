//axios - Promise based HTTP client for the browser and node.js
import request from 'axios';
import config from '../config'

export const CITIES_GET = 'CITIES_GET';
export const CITIES_GET_REQUEST = 'CITIES_GET_REQUEST';
export const CITIES_GET_SUCCESS = 'CITIES_GET_SUCCESS';
export const CITIES_GET_FAILURE = 'CITIES_GET_FAILURE';

/*Action Creator functions*/
export function citiesGet(saleRent) {
    return {
        type: CITIES_GET,
        promise: request.get(`${config.fireDb}${saleRent}.json?shallow=true`),
        obj: true
    };
}

export function getCitiesIfNeeded(params, location) {
    const saleRent = location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
    return (dispatch, getState) => {

        return dispatch(citiesGet(saleRent));

    };
}


