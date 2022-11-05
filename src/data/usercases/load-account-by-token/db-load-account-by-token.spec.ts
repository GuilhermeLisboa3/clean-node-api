import { Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

describe('DbLoadAccountByToken Usecase', () => {
  it('should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('any_value'))
      }
    }
    const decrypterSutb = new DecrypterStub()
    const decryptSpy = jest.spyOn(decrypterSutb, 'decrypt')
    const sut = new DbLoadAccountByToken(decrypterSutb)
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
