export const queryString = (params) => Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
