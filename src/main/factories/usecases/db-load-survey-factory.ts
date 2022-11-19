import { LoadSurveys } from '@/domain/usercases'
import { SurveyMongoRepository } from '@/infra/db/mongodb'
import { DbLoadSurveys } from '@/data/usercases'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
