const pathValidate = path => {
    const regex = /\w+(\/\w+)*/g;
    return regex.test(path);
};
const normalizeFolderPath = path => {
    path = path
        .replace(/(\\)+/g, '/')
        .replace(/^\//g, '')
        .replace(/\/$/g, '')
        .replace(/(\/)+/g, '/');
    return path;
};
export const normalizePath = path => {
    if (pathValidate(path))
        return path;
    return normalizeFolderPath(path);
};
//# sourceMappingURL=normalized.js.map