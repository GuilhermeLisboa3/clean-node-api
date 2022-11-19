import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAddAccount, makeDbAuthentication, makeLogControllerDecorator } from '@/main/factories'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
