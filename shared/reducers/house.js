import {
    HOUSE_GET_REQUEST,
    HOUSE_GET_SUCCESS,
    HOUSE_GET_FAILURE,

} from '../actions/house';

export default function house(state = {isFetching: false, house: null, error: null}, action) {
    switch (action.type) {
        case HOUSE_GET_REQUEST:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );
            break;
        case HOUSE_GET_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: false,
                    house: action.items
                });
            break;
        case HOUSE_GET_FAILURE:
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