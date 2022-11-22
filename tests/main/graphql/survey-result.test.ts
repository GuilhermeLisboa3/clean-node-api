import { setupApp } from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb'
import { Collection } from 'mongodb'
import request from 'supertest'
import { Express } from 'express'
import { sign } from 'jsonwebtoken'

let accountCollection: Collection
let surveyCollection: Collection
let app: Express

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    role: 'admin'
  })
  const id = MongoHelper.parseToObjectId(res.insertedId.toString())
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('SurveyResult GraphQl', () => {
  beforeAll(async () => {
    app = await setupApp()
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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('SurveyResult Query', () => {
    it('should return an SurveyResult', async () => {
      const accessToken = await makeAccessToken()
      const survey = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const query = `
        query {
          surveyResult (surveyId: "${survey.insertedId.toHexString()}") {
            question
            answers {
              answer
              count
              percent
              isCurrentAccountAnswer
            }
            date
          }
        }
      `
      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
        .expect(200)
      expect(res.body.data.surveyResult.question).toBe('Question')
      expect(res.body.data.surveyResult.answers).toEqual([{
        answer: 'Answer',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }, {
        answer: 'Answer 2',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }])
    })

    it('should return an AccessDeniedError if no token is provided', async () => {
      const survey = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const query = `
        query {
          surveyResult (surveyId: "${survey.insertedId.toHexString()}") {
            question
            answers {
              answer
              count
              percent
              isCurrentAccountAnswer
            }
            date
          }
        }
      `
      const res = await request(app)
        .post('/graphql')
        .send({ query })
        .expect(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toEqual('Access denied')
    })
  })

  describe('SaveSurveyResult Mutation', () => {
    it('should return an SurveyResult', async () => {
      const accessToken = await makeAccessToken()
      const survey = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const query = `
        mutation {
          saveSurveyResult (surveyId: "${survey.insertedId.toHexString()}", answer: "Answer") {
            question
            answers {
              answer
              count
              percent
              isCurrentAccountAnswer
            }
            date
          }
        }
      `
      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
        .expect(200)
      expect(res.body.data.saveSurveyResult.question).toBe('Question')
      expect(res.body.data.saveSurveyResult.answers).toEqual([{
        answer: 'Answer',
        count: 1,
        percent: 100,
        isCurrentAccountAnswer: true
      }, {
        answer: 'Answer 2',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }])
    })

    it('should return an AccessDeniedError if no token is provided', async () => {
      const survey = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const query = `
        mutation {
          saveSurveyResult (surveyId: "${survey.insertedId.toHexString()}", answer: "Answer") {
            question
            answers {
              answer
              count
              percent
              isCurrentAccountAnswer
            }
            date
          }
        }
      `
      const res = await request(app)
        .post('/graphql')
        .send({ query })
        .expect(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toEqual('Access denied')
    })
  })
})
