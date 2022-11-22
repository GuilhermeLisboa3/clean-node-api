import { MongoHelper } from '@/infra/db/mongodb'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { setupApp } from '@/main/config/app'
import request from 'supertest'
import { Express } from 'express'

let accountCollection: Collection
let app: Express

describe('Login GraphQl', () => {
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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('LoginQuey', () => {
    const query = `
      query {
        login (email: "valid_email@email.com", password: "valid_password"){
          accessToken
          name
        }
      }
    `

    it('should return an Account on valid credentials', async () => {
      const password = await hash('valid_password', 12)
      await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password
      })
      const res = await request(app)
        .post('/graphql')
        .send({ query })
        .expect(200)
      expect(res.body.data.login.accessToken).toBeTruthy()
      expect(res.body.data.login.name).toBe('valid_name')
    })
  })
})
