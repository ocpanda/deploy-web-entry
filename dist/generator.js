export const generateNewEntryFilePath = ({ params }) => {
    const [entryFilePath, subtitle] = params.entryFilePath.split('.');
    const today = new Date().valueOf();
    return `${entryFilePath}.${today}.${subtitle}`;
};
//# sourceMappingURL=generator.js.map