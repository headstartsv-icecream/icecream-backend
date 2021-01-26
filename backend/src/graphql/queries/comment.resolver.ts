import { CrawlingSource, QueryResolvers } from '../../graphql/generated/graphql'
import { connection } from '../../mysql/connect'

const commentsSQL = 'select * from comment'
const commentSQL = 'select * from comment'

export const Query: QueryResolvers = {
  comments: () => {
    return new Promise((resolve, reject) => {
      connection.query(commentsSQL, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }

        resolve(
          rows.map((row: any, index: number) => ({
            id: index,
            creationDate: new Date(), // temporary
            crawlingDate: new Date(), // temporary
            content: row.comment,
            userName: row.id,
            source: row.source === 'youtube' ? CrawlingSource.Youtube : CrawlingSource.Melon,
          }))
        )
      })
    })
  },

  comment: (_, { id }) => {
    return new Promise((resolve, reject) => {
      connection.query(commentSQL, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }

        const row = rows[+id]
        resolve({
          id: id,
          creationDate: new Date(), // temporary
          crawlingDate: new Date(), // temporary
          content: row.comment,
          userName: row.id,
          source: row.source === 'youtube' ? CrawlingSource.Youtube : CrawlingSource.Melon,
        })
      })
    })
  },
}
