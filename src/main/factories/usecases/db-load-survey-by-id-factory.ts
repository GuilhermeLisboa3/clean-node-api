import { SurveyMongoRepository } from '@/infra/db/mongodb'
import { LoadSurveyById } from '@/domain/usercases'
import { DbLoadSurveyById } from '@/data/usercases'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
