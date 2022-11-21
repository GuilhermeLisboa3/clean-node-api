import setupMiddlewares from './middlewares'
import setupApolloServer from './apollo-server'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import setupSwagger from './swagger'
import express, { Express } from 'express'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupStaticFiles(app)
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  await setupApolloServer(app)
  return app
}
