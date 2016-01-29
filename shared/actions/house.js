//axios - Promise based HTTP client for the browser and node.js
import request from 'axios';

import config from '../config';

export const HOUSE_GET = 'HOUSE_GET';
export const HOUSE_GET_REQUEST = 'HOUSE_GET_REQUEST';
export const HOUSE_GET_SUCCESS = 'HOUSE_GET_SUCCESS';
export const HOUSE_GET_FAILURE = 'HOUSE_GET_FAILURE';

/*Action Creator functions*/
export function houseGet(saleRent, city, zip, street) {
    return {
        type: HOUSE_GET,
        promise: request.get(`${config.fireDb}/${saleRent}/${city}/${zip}/${street}/.json`),
        obj: true
    };
}

export function getHouseIfNeeded(params, location) {
    const saleRent = location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
    const city = params.city;
    const zipType = params.zipType;
    const street = params.street;

    return (dispatch, getState) => {

        return dispatch(houseGet(saleRent, city, zipType, street));
    };
}


