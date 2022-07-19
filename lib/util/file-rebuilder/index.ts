import { PathLike } from 'fs'
import fs from 'fs/promises'
import { Buffer } from 'buffer'

export const fileRebuilder: Func<{ params: Params }, void> = async ({ params }) => {
  await rebuildEntryFile({
    entryFilePath: params.entryFilePath as PathLike,
    newEntryFilePath: params.newEntryFilePath as PathLike
  })

  await rebuildNginxFile({ params })
}

const rebuildEntryFile: Func<{
  entryFilePath: PathLike
  newEntryFilePath: PathLike
}, Promise<void>> = async ({ entryFilePath, newEntryFilePath }) => {
  await fs.rename(entryFilePath, newEntryFilePath)
}

const rebuildNginxFile: Func<{ params: Params }, Promise<void>> = async ({ params }) => {
  const nginxContent = await readNginxIndexFile({ nginxPath: params.nginxPath as PathLike })

  const newNginxConfContent = injectEntryFileNameToNginxConf({
    nginxContent,
    newEntryFileName: params.newEntryFileName as string,
  })
  await writeNginxConf({
    nginxContent: newNginxConfContent as String,
    nginxPath: params.nginxPath as PathLike
  })
}

const readNginxIndexFile: Func<{
  nginxPath: PathLike
}, Promise<String>> = async ({ nginxPath }) => {
  const file = await fs.readFile(nginxPath)

  return file.toString()
}

const injectEntryFileNameToNginxConf: Func<{
  nginxContent: String
  newEntryFileName: string
}, string> = ({ nginxContent, newEntryFileName }) => {
  return nginxContent.replace(/\${deploy_web_entry}/g, newEntryFileName)
}

const writeNginxConf: Func<{
  nginxContent: String
  nginxPath: PathLike
}, Promise<void>> = async ({ nginxContent, nginxPath }) => {
  const fileContentBuffer = new Uint8Array(Buffer.from(nginxContent))
  
  await fs.writeFile(nginxPath, fileContentBuffer)
}
