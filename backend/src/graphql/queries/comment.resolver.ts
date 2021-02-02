import { CrawlingSource, QueryResolvers } from '../../graphql/generated/graphql'
import { connection } from '../../database/mysql'

const commentsSQL = 'select * from comment;'
const commentSQL = 'select * from comment where id = $1;'

export const Query: QueryResolvers = {
  comments: () => {
	  console.log('comments query')
    return new Promise((resolve, reject) => {
      connection.query(commentsSQL, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }
	console.log(rows)
        resolve(
          rows.map((row: any) => ({
	    id: 1,
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
