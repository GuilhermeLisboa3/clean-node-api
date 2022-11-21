import { SurveyMongoRepository } from '@/infra/db/mongodb'
import { LoadAnswerBySurvey } from '@/domain/usecases'
import { DbLoadAnswerBySurvey } from '@/data/usecases'

export const makeDbLoadAnswerBySurvey = (): LoadAnswerBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswerBySurvey(surveyMongoRepository)
}
