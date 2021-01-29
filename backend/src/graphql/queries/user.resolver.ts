import { QueryResolvers } from 'src/graphql/generated/graphql'
import { connection } from '../../database/mysql'

const usersSQL = 'select * from users;'
const meSQL = 'select * from users where id = $1;'

export const Query: QueryResolvers = {
  users: () => {
    return new Promise((resolve, reject) => {
      connection.query(usersSQL, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }
        console.log(rows)
        resolve(rows)
      })
    })
  },

  me: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(usersSQL, (err: Error, row: any, cols: any) => {
        if (err) {
          reject(err)
        }
        console.log(row)
        resolve(row)
      })
    })
  },
}
