import { LoadSurveys } from '@/domain/usecases'
import { SurveyMongoRepository } from '@/infra/db/mongodb'
import { DbLoadSurveys } from '@/data/usecases'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
