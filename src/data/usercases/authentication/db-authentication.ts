import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '../../../domain/usercases/authetication'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { TokenGenerator } from '../../protocols/criptography/token-generate'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparerStub: HashComparer
  private readonly tokenGenerator: TokenGenerator
  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparerStub: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparerStub = hashComparerStub
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparerStub.compare(authentication.password, account.password)
      await this.tokenGenerator.generate(account.id)
    }
    return null
  }
}
