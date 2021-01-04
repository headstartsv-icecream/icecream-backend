import { QueryResolvers } from 'src/graphql/generated/graphql'

export const Query: QueryResolvers = {
  cById: async (_, { cId }) => {
    return {
      id: `${cId}`,
      creationDate: new Date(),
      name: 'name오오롷ㄹ호dddd롤',
      age: 12,
    }
  },
}
