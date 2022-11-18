import { SurveyResultMongoRepository } from './survey-result-mongo-respository'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'
import { Collection } from 'mongodb'
import { mockAddSurveyParams, mockAddAccountParams } from '@/domain/test'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const mockSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne(mockAddSurveyParams())
  const survey = await surveyCollection.findOne({ _id: res.insertedId })
  return MongoHelper.map(survey)
}

const mockAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  const account = await accountCollection.findOne({ _id: res.insertedId })
  return MongoHelper.map(account)
}

describe('SurveyMongoRepository', () => {
  beforeAll(async () => {
    if (typeof process.env.MONGO_URL === 'string') {
      await MongoHelper.connect(process.env.MONGO_URL)
    }
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    it('should add a survey result if its new', async () => {
      const survey = await mockSurvey()
      const account = await mockAccount()
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account.id)
      })
      expect(surveyResult).toBeTruthy()
    })

    it('should update survey result if its not new', async () => {
      const survey = await mockSurvey()
      const account = await mockAccount()
      const res = await surveyResultCollection.insertOne({
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account.id),
        answer: survey.answers[1].answer,
        date: new Date()
      })
      const surveyOne = await surveyResultCollection.findOne({ _id: res.insertedId })
      MongoHelper.map(surveyOne)
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.find({
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account.id)
      }).toArray()
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('LoadBySurveyId', () => {
    it('should load survey result', async () => {
      const survey = await mockSurvey()
      const account = await mockAccount()
      const account2 = await mockAccount()
      await surveyResultCollection.insertMany([{
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account2.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account.id)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    it('should load survey result 2', async () => {
      const survey = await mockSurvey()
      const account = await mockAccount()
      const account2 = await mockAccount()
      const account3 = await mockAccount()
      await surveyResultCollection.insertMany([{
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account2.id),
        answer: survey.answers[1].answer,
        date: new Date()
      }, {
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account3.id),
        answer: survey.answers[1].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account2.id)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(67)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(33)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    it('should load survey result 3', async () => {
      const survey = await mockSurvey()
      const account = await mockAccount()
      const account2 = await mockAccount()
      const account3 = await mockAccount()
      await surveyResultCollection.insertMany([{
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account2.id),
        answer: survey.answers[1].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account3.id)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(false)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    it('should return null if there is no survey result', async () => {
      const survey = await mockSurvey()
      const account = await mockAccount()
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account.id)
      expect(surveyResult).toBeNull()
    })
  })
})
