import {
    ZIPS_GET_REQUEST,
    ZIPS_GET_SUCCESS,
    ZIPS_GET_FAILURE,

} from '../actions/zips';

export default function zips(state = {isFetching: false, zips: [], error: null}, action) {
    switch (action.type) {
        case ZIPS_GET_REQUEST:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );
            break;
        case ZIPS_GET_SUCCESS:
            console.log(action.items);
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: false,
                    zips: action.items
                });
            break;
        case ZIPS_GET_FAILURE:
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