import { ApolloServer } from 'apollo-server'
import schema from '../graphql/schema'

export const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
})
