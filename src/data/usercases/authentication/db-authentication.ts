import {
  Authentication,
  AuthenticationModel,
  LoadAccountByEmailRepository,
  HashComparer,
  TokenGenerator,
  UpdatedAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparerStub: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updatedAccessTokenRepository: UpdatedAccessTokenRepository
  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparerStub: HashComparer,
    tokenGenerator: TokenGenerator,
    updatedAccessTokenRepository: UpdatedAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparerStub = hashComparerStub
    this.tokenGenerator = tokenGenerator
    this.updatedAccessTokenRepository = updatedAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparerStub.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updatedAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
