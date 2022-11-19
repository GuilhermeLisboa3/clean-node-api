import { CompareFieldValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import faker from 'faker'

const field = faker.random.word()
const fieldToCompare = faker.random.word()

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation(field, fieldToCompare)
}
describe('CompareFieldsValidation', () => {
  it('should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })
  it('should not return if validation succeeds', () => {
    const sut = makeSut()
    const value = faker.random.word()
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
