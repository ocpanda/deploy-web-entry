import yargs from 'yargs';
import { normalizePath, } from './normalize.js';
import { generateNewEntryFilePath } from './generator.js';
const argv = await yargs(process.argv.slice(2))
    .option('nginx-path', {
    desc: 'Nginx config file path.',
    type: 'string',
    default: 'nginx.conf',
})
    .option('entry-file-path', {
    desc: 'Entry filename.',
    type: 'string',
    alias: 'entry',
    default: 'dist/index.html',
}).argv;
export default (() => {
    const params = (() => {
        const entryFilePath = normalizePath({ path: argv.entryFilePath });
        const { fullPath, fileName } = generateNewEntryFilePath({ entryFilePath });
        return {
            entryFilePath: entryFilePath,
            newEntryFilePath: fullPath,
            newEntryFileName: fileName,
            nginxPath: normalizePath({ path: argv.nginxPath }),
        };
    })();
    return params;
});
//# sourceMappingURL=params.js.map