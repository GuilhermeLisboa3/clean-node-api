import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError } from './../errors/'
import { forbidden } from './../helpers/http/http-helper'

describe('Auth Middleware', () => {
  it('should return 403 if no x-access-token exists in headres', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
