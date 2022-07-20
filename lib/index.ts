import Params from './util/params.js'
import { fileRebuilder } from './util/file-rebuilder/index.js'

const main = async () => {
  console.log('Starting build web entry.')
  const params = await Params()
  
  fileRebuilder({ params })
  console.log('Building web entry success.')
}
main()
