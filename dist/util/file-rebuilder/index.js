import fs from 'fs/promises';
import { Buffer } from 'buffer';
export const fileRebuilder = async ({ params }) => {
    await rebuildEntryFile({
        entryFilePath: params.entryFilePath,
        newEntryFilePath: params.newEntryFilePath
    });
    await rebuildNginxFile({ params });
};
const rebuildEntryFile = async ({ entryFilePath, newEntryFilePath }) => {
    try {
        await fs.rename(entryFilePath, newEntryFilePath);
    }
    catch (e) {
        console.warn(e);
    }
};
const rebuildNginxFile = async ({ params }) => {
    const nginxContent = await readNginxIndexFile({ nginxPath: params.nginxPath });
    const newNginxConfContent = injectEntryFileNameToNginxConf({
        nginxContent,
        newEntryFileName: params.newEntryFileName,
    });
    await writeNginxConf({
        nginxContent: newNginxConfContent,
        nginxPath: params.nginxPath
    });
};
const readNginxIndexFile = async ({ nginxPath }) => {
    const file = await fs.readFile(nginxPath);
    return file.toString();
};
const injectEntryFileNameToNginxConf = ({ nginxContent, newEntryFileName }) => {
    return nginxContent.replace(/\${deploy_web_entry}/g, newEntryFileName);
};
const writeNginxConf = async ({ nginxContent, nginxPath }) => {
    const fileContentBuffer = new Uint8Array(Buffer.from(nginxContent));
    try {
        await fs.writeFile(nginxPath, fileContentBuffer);
    }
    catch (e) {
        console.warn(e);
    }
};
//# sourceMappingURL=index.js.map