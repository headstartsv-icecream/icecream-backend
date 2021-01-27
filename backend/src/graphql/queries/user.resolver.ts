import { QueryResolvers } from 'src/graphql/generated/graphql'
import { connection } from '../../database/mysql'

const sql = 'select * from users;'

export const Query: QueryResolvers = {
  users: () => {
    return new Promise((resolve, reject) => {
      connection.query(sql, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }
        console.log(rows)
        resolve(rows)
      })
    })
  },
}
