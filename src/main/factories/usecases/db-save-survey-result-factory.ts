import { SaveSurveyResult } from '@/domain/usercases'
import { DbSaveSurveyResult } from '@/data/usercases'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
