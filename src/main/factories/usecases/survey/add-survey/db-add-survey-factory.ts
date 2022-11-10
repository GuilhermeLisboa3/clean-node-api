import { DbAddSurvey } from '@/data/usercases/survey/add-survey/db-add-survey'
import { AddSurvey } from '@/domain/usercases/survey/add-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
