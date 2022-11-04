import { MongoHelper } from './../helpers/mongo-helper'
import { AddSurveyModel, AddSurveyRepository } from '../../../../data/usercases/add-survey/db-add-survey-protocols'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
