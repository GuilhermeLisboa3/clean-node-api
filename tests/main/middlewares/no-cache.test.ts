import request from 'supertest'
import { noCache } from '@/main/middlewares'
import { setupApp } from '@/main/config/app'
import { Express } from 'express'

let app: Express

describe('NoCache Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  it('should disable case', async () => {
    app.get('/test_no_cache', noCache, (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
