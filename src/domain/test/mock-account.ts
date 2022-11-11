import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usercases/account/add-account'
import { AuthenticationParams } from '@/domain/usercases/account/authetication'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams(), {
  id: 'any_id'
})

export const mockFakeAuthentication = (): AuthenticationParams => ({
  email: 'any_email@email.com',
  password: 'any_password'
})
