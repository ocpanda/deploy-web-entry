import yargs from 'yargs';
import { normalizePath, } from './util/normalize.js';
const argv = await yargs(process.argv.slice(2))
    .option('nginx-path', {
    desc: 'Nginx config file path.',
    type: 'string',
    default: 'nginx.conf',
})
    .option('entry-file-path', {
    desc: 'Entry filename.',
    type: 'string',
    alias: 'ef',
    default: 'dist/index.html',
}).argv;
export default (() => {
    const params = {
        entryFilePath: normalizePath({ path: argv.entryFilePath }),
        nginxPath: normalizePath({ path: argv.nginxPath }),
    };
    return params;
});
//# sourceMappingURL=params.js.map