import {
    CITIES_GET_REQUEST,
    CITIES_GET_SUCCESS,
    CITIES_GET_FAILURE,

} from '../actions/cities';

export default function cities(state = {isFetching: false, cities: [], error: null}, action) {
    switch (action.type) {
        case CITIES_GET_REQUEST:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );
            break;
        case CITIES_GET_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: false,
                    cities: action.items
                });
            break;
        case CITIES_GET_FAILURE:
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