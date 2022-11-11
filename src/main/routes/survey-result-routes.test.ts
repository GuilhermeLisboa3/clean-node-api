import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'

describe('Survey Routes', () => {
  beforeAll(async () => {
    if (typeof process.env.MONGO_URL === 'string') {
      await MongoHelper.connect(process.env.MONGO_URL)
    }
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /surveys/:surveyId/results', () => {
    it('should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/:surveyId/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})
