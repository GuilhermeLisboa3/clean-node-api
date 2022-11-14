import pathsFile from './path'
import schemaFile from './schemas'
import componetsFile from './components'
export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'Api feita para realizar enquetes entre programadores.',
    version: '1.0.0'
  },
  servers: [
    {
      url: '/api'
    }
  ],
  tags: [{ name: 'Login' }, { name: 'Enquete' }],
  paths: pathsFile,
  schemas: schemaFile,
  components: componetsFile
}
