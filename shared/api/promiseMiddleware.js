export default function promiseMiddleware() {
    return next => action => {

        const { promise, type, ...rest } = action;

        if (!promise) return next(action);

        const SUCCESS = type + '_SUCCESS';
        const REQUEST = type + '_REQUEST';
        const FAILURE = type + '_FAILURE';
        return promise
            .then(req => {
                req = objtoArray(req);
                var items = req.data;
                console.log(items);
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
        item.key = key;
        return item;
    });
    return req;
}