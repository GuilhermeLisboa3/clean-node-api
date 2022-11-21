import { SaveSurveyResultSpy, LoadAnswerBySurveySpy } from '../mocks'
import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { throwError } from '@/tests/domain/mocks'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (answer: string = null): SaveSurveyResultController.Request => ({
  surveyId: faker.random.uuid(),
  answer,
  accountId: faker.random.uuid()
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadAnswerBySurveySpy: LoadAnswerBySurveySpy
  saveSurveyResultSpy: SaveSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadAnswerBySurveySpy = new LoadAnswerBySurveySpy()
  const saveSurveyResultSpy = new SaveSurveyResultSpy()
  const sut = new SaveSurveyResultController(loadAnswerBySurveySpy, saveSurveyResultSpy)
  return {
    sut,
    loadAnswerBySurveySpy,
    saveSurveyResultSpy
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  it('should call loadAnswerBySurvey with correct values', async () => {
    const { sut, loadAnswerBySurveySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAnswerBySurveySpy.id).toBe(request.surveyId)
  })

  it('should return 403 if loadAnswerBySurvey returns null', async () => {
    const { sut, loadAnswerBySurveySpy } = makeSut()
    loadAnswerBySurveySpy.result = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('should return 500 if loadAnswerBySurvey throws', async () => {
    const { sut, loadAnswerBySurveySpy } = makeSut()
    jest.spyOn(loadAnswerBySurveySpy, 'loadAnswers').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 403 if an invalid answer id provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  it('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultSpy, loadAnswerBySurveySpy } = makeSut()
    const request = mockRequest(loadAnswerBySurveySpy.result[0])
    await sut.handle(request)
    expect(saveSurveyResultSpy.saveSurveyResultParams).toEqual({
      surveyId: request.surveyId,
      accountId: request.accountId,
      date: new Date(),
      answer: request.answer
    })
  })

  it('should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultSpy, loadAnswerBySurveySpy } = makeSut()
    jest.spyOn(saveSurveyResultSpy, 'save').mockImplementationOnce(throwError)
    const request = mockRequest(loadAnswerBySurveySpy.result[0])
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 200 on success', async () => {
    const { sut, saveSurveyResultSpy, loadAnswerBySurveySpy } = makeSut()
    const request = mockRequest(loadAnswerBySurveySpy.result[0])
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(saveSurveyResultSpy.surveyResultModel))
  })
})
