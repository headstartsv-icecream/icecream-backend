import { QueryResolvers } from 'src/graphql/generated/graphql'
import { connection } from '../../mysql/connect'

const sql = 'select * from users;'

export const Query: QueryResolvers = {
  users: () => {
    return new Promise((resolve, reject) => {
      connection.query(sql, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  },
}
