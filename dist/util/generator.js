export const generateNewEntryFilePath = ({ entryFilePath }) => {
    const [filePath, subtitle] = entryFilePath.split('.');
    const today = new Date().valueOf();
    const generateSubtitle = `${today}.${subtitle}`;
    return {
        fullPath: `${filePath}.${generateSubtitle}`,
        fileName: `${filePath.split('/').pop()}.${generateSubtitle}`,
    };
};
//# sourceMappingURL=generator.js.map