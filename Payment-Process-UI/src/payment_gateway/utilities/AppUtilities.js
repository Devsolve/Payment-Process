export const httpGetConfig = (url) => {
    return {
        method: 'GET',
        url: url,
        responseType: 'json',
        header: {
            "Access-Control-Allow-Origin": "http://127.0.0.1:4570/"
        }
    };
};

export const httpPostConfig = (url, data) => {
    return {
        method: 'POST',
        url: url,
        data: data,
        responseType: 'json',
        header: {
            "Access-Control-Allow-Origin": "http://127.0.0.1:4570/"
        }
    };
};