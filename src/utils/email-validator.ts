import { EmailValidator } from '../presentation/protocols/email-validdator'
export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
