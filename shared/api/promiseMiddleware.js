import _ from 'lodash';

export default function promiseMiddleware() {
    return next => action => {

        const {promise, filter, obj, type, ...rest} = action;

        if (!promise) return next(action);

        const SUCCESS = type + '_SUCCESS';
        const REQUEST = type + '_REQUEST';
        const FAILURE = type + '_FAILURE';
        return promise
            .then(req => {
                if (!obj) {
                    req = objtoArray(req);
                }
                var items = req.data;
                if (filter) {

                    if (filter.match(/\d+/g)) {

                        items = _.toArray(items[filter]);
                    } else {
                        //    filter by propTypes
                        let filter2 = filter.substr(0, filter.length - 1).toLowerCase().replace(/-+/g, ' ');
                        let arr = _.filter(_.flatten((_.values(items).map(zip=>_.values(zip)))), home=>home.type.toLowerCase() == filter2);
                        items = arr;
                    }
                }
                next({items, type: SUCCESS});
                return true;
            })
            .catch(error => {
                next({...rest, error, type: FAILURE});
                console.log(error);
                return false;
            });
    };
}

var objtoArray = (req)=> {
    if (!req.data || typeof req.data !== 'object') {
        return req;
    }
    req.data = Object.keys(req.data).map(key=> {
        let item = req.data[key];
        if (typeof item === 'object') {
            item.key = key;
        }
        return item;
    });
    return req;
}