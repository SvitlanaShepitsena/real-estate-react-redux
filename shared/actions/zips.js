//axios - Promise based HTTP client for the browser and node.js
import request from 'axios';

export const ZIPS_GET = 'ZIPS_GET';
export const ZIPS_GET_REQUEST = 'ZIPS_GET_REQUEST';
export const ZIPS_GET_SUCCESS = 'ZIPS_GET_SUCCESS';
export const ZIPS_GET_FAILURE = 'ZIPS_GET_FAILURE';

/*Action Creator functions*/
export function zipsGet() {
    return {
        type: ZIPS_GET,
        promise: request.get('https://real-estate-react.firebaseio.com/autocomplete.json')
    };
}

export function getZIPsIfNeeded() {
    return (dispatch, getState) => {
        if (!getState().zips.length) {
            return dispatch(zipsGet());
        }
    };
}


