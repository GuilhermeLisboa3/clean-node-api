import { AddSurveyParams } from '@/domain/usercases/add-survey'

export interface AddSurveyRepository {
  add: (data: AddSurveyParams) => Promise<void>
}
