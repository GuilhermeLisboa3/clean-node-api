import { AddSurveyModel } from '../../../../domain/usercases/add-survey'

export interface AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
