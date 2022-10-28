import { MissingParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'
import { Validation } from './validation'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
interface SutTypes {
  sut: ValidationComposite
  validatorStub: Validation
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidation()
  const sut = new ValidationComposite([validatorStub])
  return {
    sut,
    validatorStub
  }
}

describe('Validation Composite', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
