import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-field-validator'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validator'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'
jest.mock('../../presentation/helpers/validators/validation-composite')
describe('SignUpValidation Factory', () => {
  it('should call ValidationComposite with all validatations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
