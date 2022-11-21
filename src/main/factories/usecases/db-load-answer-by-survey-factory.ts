import { SurveyMongoRepository } from '@/infra/db/mongodb'
import { LoadAnswersBySurvey } from '@/domain/usecases'
import { DbLoadAnswerBySurvey } from '@/data/usecases'

export const makeDbLoadAnswerBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswerBySurvey(surveyMongoRepository)
}
