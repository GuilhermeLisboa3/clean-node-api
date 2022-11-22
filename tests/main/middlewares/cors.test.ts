import request from 'supertest'
import { setupApp } from '@/main/config/app'
import { Express } from 'express'

let app: Express

describe('Cors Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  it('should anable cors', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_body_parser')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
