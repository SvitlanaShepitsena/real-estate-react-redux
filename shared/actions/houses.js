//axios - Promise based HTTP client for the browser and node.js
import request from 'axios';

export const HOUSES_GET = 'HOUSES_GET';
export const HOUSES_GET_REQUEST = 'HOUSES_GET_REQUEST';
export const HOUSES_GET_SUCCESS = 'HOUSES_GET_SUCCESS';
export const HOUSES_GET_FAILURE = 'HOUSES_GET_FAILURE';

export const ADD_HOUSE = 'ADD_HOUSE';
export const REMOVE_HOUSE = 'REMOVE_HOUSE';

/*Action Creator functions*/
export function housesGet(zip) {
    return {
        type: HOUSES_GET,
        promise: request.get('https://real-estate-react.firebaseio.com/sale/skokie.json')
    };
}

export function addHouse(house) {
    return {
        type: ADD_HOUSE,
        payload: house
    };
}
export function removeHouse(index) {
    return {
        type: REMOVE_HOUSE,
        payload: index
    };
}

export function getHousesIfNeeded(zip) {
    return (dispatch, getState) => {
        if (!getState().houses.length) {
            return dispatch(housesGet(zip));
        }
    };
}


