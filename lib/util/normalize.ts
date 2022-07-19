import chalk from 'chalk'

const pathValidate: Validate = path => {
  const regex = /^\w+(\/\w+)*\.(htm(l*)|conf)$/g

  const validated = regex.test(path)
  if (!validated) chalk.yellow(`
    WARNING: ${path} format something going wrong.
  `)

  return validated
}

const normalizeFolderPath: NormalizePath<{
  path: string
}> = ({ path }) => {
  path = path
    .replace(/(\\)+/g, '/')
    .replace(/^\//g, '')
    .replace(/\/$/g, '')
    .replace(/(\/)+/g, '/')

  return path
}

export const normalizePath: NormalizePath<{ path: string }> = ({ path }) => {
  if (pathValidate(path)) return path

  return normalizeFolderPath({ path })
}
