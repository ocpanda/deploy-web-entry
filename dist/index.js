import Params from './util/params.js';
import { fileRebuilder } from './util/file-rebuilder/index.js';
const main = () => {
    console.log('Starting build web entry.');
    const params = Params();
    fileRebuilder({ params });
    console.log('Building web entry success.');
};
main();
//# sourceMappingURL=index.js.map