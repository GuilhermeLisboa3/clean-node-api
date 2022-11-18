import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { AddAccount, AddAccountParams, AccountModel, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (data: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(data.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(data.password)
      const newAccount = await this.addAccountRepository.add(Object.assign({}, data, {
        password: hashedPassword
      }))
      return Promise.resolve(newAccount)
    }
    return null
  }
}
