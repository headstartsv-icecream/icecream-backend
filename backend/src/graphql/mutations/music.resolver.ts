import { MutationResolvers } from 'src/graphql/generated/graphql'
import { connection } from '../../database/mysql'

const sql =
  'insert into music (content, ...) values ($2, ...) where 1 exist (select key from music where key = $1)'

export const Mutation: MutationResolvers = {
  createOrModifyMusic: (_, { input }) => {
    return new Promise((resolve, reject) => {
      resolve({
        id: '123123',
        title: input.title ?? '',
        artists: input.artists ?? [],
        searchCount: 0,
      })
      // connection.query(sql, (err: Error, row: any, cols: any) => {
      //   if (err) {
      //     reject(err)
      //   }
      // })
    })
  },
}
