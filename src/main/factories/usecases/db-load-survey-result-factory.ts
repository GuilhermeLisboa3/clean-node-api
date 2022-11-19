import { SurveyResultMongoRepository, SurveyMongoRepository } from '@/infra/db/mongodb'
import { LoadSurveyResult } from '@/domain/usercases'
import { DbLoadSurveyResult } from '@/data/usercases'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
