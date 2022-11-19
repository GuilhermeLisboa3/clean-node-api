import { DbAddSurvey } from '@/data/usercases'
import { AddSurvey } from '@/domain/usercases'
import { SurveyMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
