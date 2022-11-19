import { JwtAdapter } from '@/infra/criptography'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign: async (): Promise<string> => {
    return new Promise<string>(resolve => resolve('any_token'))
  },

  verify: async (): Promise<string> => {
    return new Promise<string>(resolve => resolve('any_value'))
  }
}))

const mockSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('sign', () => {
    it('should call sign with correct values', async () => {
      const sut = mockSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })
    it('should return a token on sign success', async () => {
      const sut = mockSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })
    it('should throws if sign throws', async () => {
      const sut = mockSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify', () => {
    it('should call verify with correct values', async () => {
      const sut = mockSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })
    it('should return a value on veirfy success', async () => {
      const sut = mockSut()
      const value = await sut.decrypt('any_token')
      expect(value).toBe('any_value')
    })
    it('should throws if verify throws', async () => {
      const sut = mockSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })
  })
})
