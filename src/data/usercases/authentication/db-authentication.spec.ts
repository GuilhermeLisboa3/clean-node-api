import { AccountModel } from './../../../domain/models/account'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'
import { AuthenticationModel } from '../../../domain/usercases/authetication'

const makeFackAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@email.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFackAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}
interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}
const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthetication UseCase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })
  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
