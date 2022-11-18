import { AddSurveyParams } from '@/domain/usercases/survey/add-survey'

export interface AddSurveyRepository {
  add: (data: AddSurveyParams) => Promise<void>
}
