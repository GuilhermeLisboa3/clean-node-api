import { CompareFieldValidation } from './compare-field-validation'
import { InvalidParamError } from '../../presentation/errors'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}
describe('CompareField Validation', () => {
  it('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
  it('should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
