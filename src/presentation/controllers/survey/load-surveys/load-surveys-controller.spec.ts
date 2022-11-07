import { LoadSurveysController } from './load-surveys-controller'
import { SurveyModel, LoadSurveys } from './load-surveys-controller-protocols'
import MockDate from 'mockdate'

const makeFakeSurvey = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }]
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  it('should call LoadSurvey', async () => {
    class LoadSurveyStub implements LoadSurveys {
      async load (): Promise<SurveyModel[]> {
        return new Promise(resolve => resolve(makeFakeSurvey()))
      }
    }
    const loadSurveyStub = new LoadSurveyStub()
    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    const sut = new LoadSurveysController(loadSurveyStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
