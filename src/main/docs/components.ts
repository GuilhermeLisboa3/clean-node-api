import { badRequest, serverError, unauthorized, forbidden, notFound } from './components/'
import { apiKeyAuthSchema } from './schemas/'
export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden

}
