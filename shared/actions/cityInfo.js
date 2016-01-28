//axios - Promise based HTTP client for the browser and node.js
import request from 'axios';

export const CITYINFO_GET = 'CITYINFO_GET';
export const CITYINFO_GET_REQUEST = 'CITYINFO_GET_REQUEST';
export const CITYINFO_GET_SUCCESS = 'CITYINFO_GET_SUCCESS';
export const CITYINFO_GET_FAILURE = 'CITYINFO_GET_FAILURE';

/*Action Creator functions*/
export function cityInfoGet(saleRent,city) {
    return {
        type: CITYINFO_GET,
        promise: request.get(`https://real-estate-react.firebaseio.com/${saleRent}/${city}.json`),
        obj:true
    };
}

export function getCityInfoIfNeeded(params, location) {
    const saleRent = location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
    const city = params.city;
    return (dispatch, getState) => {
            return dispatch(cityInfoGet(saleRent,city));

    };
}


