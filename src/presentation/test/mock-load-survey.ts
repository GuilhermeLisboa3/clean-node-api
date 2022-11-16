import { LoadSurveys } from '@/domain/usercases/survey/load-surveys'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveysModels } from '@/domain/test'

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveysModels()))
    }
  }
  return new LoadSurveyStub()
}
