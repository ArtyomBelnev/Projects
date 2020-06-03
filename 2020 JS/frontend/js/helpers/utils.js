export const parseRequestURL = () => {
    const url = location.hash.slice(2),
        request = {};

    [request.resource, request.id, request.action, request.check, request.rez] = url.split('/');

    return request;
};
