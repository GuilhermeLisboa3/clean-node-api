import { ServerError } from './../erros/server-error'
import { HttpResponse } from './../protocols/http'
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
export const serverRequest = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
