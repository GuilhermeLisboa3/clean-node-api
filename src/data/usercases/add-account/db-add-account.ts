import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usercases/add-account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encryptyer: Encrypter
  constructor (encryptyer: Encrypter) {
    this.encryptyer = encryptyer
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encryptyer.encrypt(account.password)
    return new Promise(resolve => resolve({
      id: 'valid_id',
      email: 'valid_email',
      password: 'valid_password',
      name: ' valid_name'
    }))
  }
}
