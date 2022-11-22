import request from 'supertest'
import { setupApp } from '@/main/config/app'
import { Express } from 'express'

let app: Express

describe('Body Parser Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  it('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Guilherme' })
      .expect({ name: 'Guilherme' })
  })
})
