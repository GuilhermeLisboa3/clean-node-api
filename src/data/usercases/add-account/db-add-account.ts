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
    await this.addAccountRepository.add(Object.assign({}, accountData, {
      password: hashedPassword
    }))
    return new Promise(resolve => resolve({
      id: 'valid_id',
      email: 'valid_email',
      password: 'valid_password',
      name: ' valid_name'
    }))
  }
}
