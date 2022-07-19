import Params from './util/params.js';
import { fileRebuilder } from './util/file-rebuilder/index.js';
const main = () => {
    const params = Params();
    fileRebuilder({ params });
};
main();
//# sourceMappingURL=index.js.map