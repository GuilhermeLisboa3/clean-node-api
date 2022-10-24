import { EmailValidator } from '../presentation/protocols/email-validdator'
import validator from 'validator'
export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
