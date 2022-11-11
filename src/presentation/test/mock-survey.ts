import { AddSurvey, AddSurveyParams } from '@/domain/usercases/survey/add-survey'
import { LoadSurveys } from '@/domain/usercases/survey/load-surveys'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyById } from '@/domain/usercases/survey/load-survey-by-id'
import { mockSurveysModels, mockSurveyModel } from '@/domain/test'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveysModels()))
    }
  }
  return new LoadSurveyStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockSurveyModel()))
    }
  }
  return new LoadSurveyByIdStub()
}
