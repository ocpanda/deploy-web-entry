import chalk from 'chalk';
const pathValidate = path => {
    const regex = /^\w+(\/\w+)*\.(htm(l*)|conf)$/g;
    const validated = regex.test(path);
    if (!validated)
        chalk.yellow(`
    WARNING: ${path} format something going wrong.
  `);
    return validated;
};
const normalizeFolderPath = ({ path }) => {
    path = path
        .replace(/(\\)+/g, '/')
        .replace(/^\//g, '')
        .replace(/\/$/g, '')
        .replace(/(\/)+/g, '/');
    return path;
};
export const normalizePath = ({ path }) => {
    if (pathValidate(path))
        return path;
    return normalizeFolderPath({ path });
};
//# sourceMappingURL=normalize.js.map