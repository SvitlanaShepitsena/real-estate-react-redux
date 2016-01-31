import {URL_CHANGE} from '../actions/url';
import setting from '../../etc/settings.js';

export default function url(state = {url: null}, action) {
    switch (action.type) {
        case URL_CHANGE:

            return (state + action.path);
            break;
        default:
            return state;
    }
}
