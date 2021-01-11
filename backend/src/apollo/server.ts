import { ApolloServer } from 'apollo-server'
import schema from '../graphql/schema'
import context from './context'

export const server = new ApolloServer({
  schema,
  context,
  introspection: true,
  playground: true,
})
