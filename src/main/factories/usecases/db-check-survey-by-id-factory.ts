import { SurveyMongoRepository } from '@/infra/db/mongodb'
import { CheckSurveyById } from '@/domain/usecases'
import { DbCheckSurveyById } from '@/data/usecases'

export const makeDbCheckSurveyById = (): CheckSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbCheckSurveyById(surveyMongoRepository)
}
