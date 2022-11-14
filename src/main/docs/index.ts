import { accountSchema, errorSchema, loginParamsSchema } from './schemas'
import { loginPath } from './path'
import { badRequest, serverError, unauthorized, notFound } from './components'
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
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
