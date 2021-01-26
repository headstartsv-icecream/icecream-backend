import { MutationResolvers } from 'src/graphql/generated/graphql'
import { connection } from '../../mysql/connect'

const sql = 'insert into comment (content) values ($1)' // mysql도 이거 맞나?

export const Mutation: MutationResolvers = {
  createComment: (_, { input }) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, (err: Error, row: any, cols: any) => {
        if (err) {
          reject(err)
        }
        resolve(true)
      })
    })
  },

  modifyComment: (_, { input }) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, (err: Error, row: any, cols: any) => {
        if (err) {
          reject(err)
        }
        resolve(true)
      })
    })
  },

  deleteComment: () => {
    return new Promise((resolve, reject) => {
      connection.query(sql, (err: Error, row: any, cols: any) => {
        if (err) {
          reject(err)
        }
        resolve(true)
      })
    })
  },
}
