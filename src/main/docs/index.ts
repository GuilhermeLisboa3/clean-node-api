import pathsFile from './path'
import schemaFile from './schemas'
import componetsFile from './components'
export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'Api feita para realizar enquetes entre programadores.',
    version: '1.0.0',
    contact: {
      name: 'Guilherme Gonçalves Lisboa',
      email: 'Guime0162@gmail.com',
      url: 'https://www.linkedin.com/in/guilherme-gon%C3%A7alves-lisboa-abb8b0227/'
    }
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
