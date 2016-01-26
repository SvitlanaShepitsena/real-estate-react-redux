import {
    CITYINFO_GET_REQUEST,
    CITYINFO_GET_SUCCESS,
    CITYINFO_GET_FAILURE,

} from '../actions/cityInfo';

export default function cityInfo(state = {isFetching: false, cityInfo: null, error: null}, action) {
    switch (action.type) {
        case CITYINFO_GET_REQUEST:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );
            break;
        case CITYINFO_GET_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: false,
                    cityInfo: action.items
                });
            break;
        case CITYINFO_GET_FAILURE:
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