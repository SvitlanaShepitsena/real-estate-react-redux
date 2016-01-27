//axios - Promise based HTTP client for the browser and node.js
import request from 'axios';

export const CITIES_GET = 'CITIES_GET';
export const CITIES_GET_REQUEST = 'CITIES_GET_REQUEST';
export const CITIES_GET_SUCCESS = 'CITIES_GET_SUCCESS';
export const CITIES_GET_FAILURE = 'CITIES_GET_FAILURE';

/*Action Creator functions*/
export function citiesGet(saleRent) {
    return {
        type: CITIES_GET,
        promise: request.get(`https://real-estate-react.firebaseio.com/${saleRent}.json?shallow=true`),
        obj:true
    };
}

export function getCitiesIfNeeded(saleRent) {
    return (dispatch, getState) => {
        var cities = getState().cities;
        if (!cities.length) {
            return dispatch(citiesGet(saleRent));
        } else{
            return cities;
        }
    };
}


