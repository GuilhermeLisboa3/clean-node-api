import typeDefs from '@/main/graphql/type-dels'
import resolvers from '@/main/graphql/resolvers'
import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'

export default async (app: Express): Promise<void> => {
  const server = new ApolloServer({
    resolvers,
    typeDefs
  })
  await server.start()
  server.applyMiddleware({ app })
}
