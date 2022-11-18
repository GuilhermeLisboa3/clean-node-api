import {
  Authentication,
  AuthenticationParams,
  LoadAccountByEmailRepository,
  HashComparer,
  Encrypter,
  UpdatedAccessTokenRepository,
  AuthenticationModel
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparerStub: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updatedAccessTokenRepository: UpdatedAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparerStub.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updatedAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return {
          accessToken,
          name: account.name
        }
      }
    }
    return null
  }
}
