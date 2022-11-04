import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError } from './../errors/'
import { forbidden } from './../helpers/http/http-helper'
import { LoadAccountByToken } from '../../domain/usercases/load-account-by-token'
import { AccountModel } from '../../domain/models/account'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

describe('Auth Middleware', () => {
  it('should return 403 if no x-access-token exists in headres', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (accesToken: string, role?: string): Promise<AccountModel> {
        return new Promise(resolve => resolve(makeFakeAccount()))
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should call LoadAccountByToken with correct accessToken', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (accesToken: string, role?: string): Promise<AccountModel> {
        return new Promise(resolve => resolve(makeFakeAccount()))
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
