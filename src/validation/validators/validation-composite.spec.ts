import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
type SutTypes = {
  sut: ValidationComposite
  validatorStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validatorStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validatorStubs)
  return {
    sut,
    validatorStubs
  }
}

describe('Validation Composite', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  it('should return the first error if more then one validation fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validatorStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })
  it('should note return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
