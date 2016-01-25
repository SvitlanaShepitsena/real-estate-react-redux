//axios - Promise based HTTP client for the browser and node.js
import request from 'axios';

export const HOUSE_GET = 'HOUSE_GET';
export const HOUSE_GET_REQUEST = 'HOUSE_GET_REQUEST';
export const HOUSE_GET_SUCCESS = 'HOUSE_GET_SUCCESS';
export const HOUSE_GET_FAILURE = 'HOUSE_GET_FAILURE';

/*Action Creator functions*/
export function houseGet(saleRent, city, zip, street) {
    console.log('run here house.js');
    return {
        type: HOUSE_GET,
        promise: request.get(`https://real-estate-react.firebaseio.com/${saleRent}/${city}/${zip}/${street}/.json`),
        obj:true
    };
}

export function getHouseIfNeeded(saleRent, city, zip, street) {
    return (dispatch, getState) => {
        let test = getState();
        console.log(test);

        if (!getState().house.house) {
            return dispatch(houseGet(saleRent, city, zip, street));
        }
    };
}

