import { AddAccountRepository } from './../../protocols/add-account-repository'
import { AddAccount, AddAccountModel, AccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encryptyer: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encryptyer: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encryptyer = encryptyer
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encryptyer.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, {
      password: hashedPassword
    }))
    return new Promise(resolve => resolve(account))
  }
}
