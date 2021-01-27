import { QueryResolvers } from '../../graphql/generated/graphql'
import { connection } from '../../database/mysql'

const commentsSQL = 'select * from music'
const commentSQL = 'select * from music where id = $1'

export const Query: QueryResolvers = {
  musics: () => {
    return new Promise((resolve, reject) => {
      connection.query(commentsSQL, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }
      })
    })
  },

  music: (_, { id }) => {
    return new Promise((resolve, reject) => {
      connection.query(commentSQL, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }
      })
    })
  },
}
