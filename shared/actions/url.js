

export const URL_CHANGE = 'URL_CHANGE';


/*Action Creator functions*/
export function urlChange(path) {
    console.log(path);
    return {
        type: URL_CHANGE,
        path:path
    };
}


