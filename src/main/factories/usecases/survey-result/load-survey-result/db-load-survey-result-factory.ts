import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-respository'
import { LoadSurveyResult } from '@/domain/usercases/survey-result/load-survey-result'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { DbLoadSurveyResult } from '@/data/usercases/survey-result/load-survey-result/db-load-survey-result'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
