import {
    HOUSES_GET_REQUEST,
    HOUSES_GET_SUCCESS,
    HOUSES_GET_FAILURE,

} from '../actions/houses';

export default function houses(state = {isFetching: false, houses: [], error: null}, action) {
    switch (action.type) {
        case HOUSES_GET_REQUEST:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );
            break;
        case HOUSES_GET_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: false,
                    houses: action.items
                });
            break;
        case HOUSES_GET_FAILURE:
            return Object.assign(
                {},
                state,
                {
                    error: action.error,
                    isFetching: false
                });
            break;


        default:
            return state;
    }
}