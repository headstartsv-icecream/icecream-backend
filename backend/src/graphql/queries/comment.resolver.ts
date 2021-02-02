import { CrawlingSource, QueryResolvers } from '../generated/graphql'
import { connection } from '../../database/mysql'
import { isTypeDefinitionNode } from 'graphql'

const commentsSQL = 'select * from comment'
const commentSQL = 'select * from comment where id=?'

const selectSource = function (row: any) {
  switch (row.source) {
    case 'youtube':
      return CrawlingSource.Youtube
    case 'melon':
      return CrawlingSource.Melon
    case 'icezam':
      return CrawlingSource.Icezam
    default:
      return CrawlingSource.Icezam
  }
}

export const Query: QueryResolvers = {
  comments: () => {
    return new Promise((resolve, reject) => {
      connection.query(commentsSQL, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }

        resolve(
          rows.map((row: any, index: number) => ({
            id: row.id,
            creationDate: row.creationDate,
            modificationDate: row.modificationDate,
            writingDate: row.writingDate,
            content: row.content,
            userName: row.userName,
            source: selectSource(row),
          }))
        )
      })
    })
  },

  comment: (_, { id }) => {
    return new Promise((resolve, reject) => {
      connection.query(commentSQL, [id], (err: Error | null, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }

        const row = rows[0]
        resolve({
          id: row.id,
          creationDate: row.creationDate,
          modificationDate: row.modificationDate,
          writingDate: row.writingDate,
          content: row.content,
          userName: row.userName,
          source: selectSource(row),
        })
      })
    })
  },
}
