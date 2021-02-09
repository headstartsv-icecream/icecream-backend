import { MutationResolvers } from 'src/graphql/generated/graphql'
import { connection } from '../../database/mysql'

const insertCommentSQL = 'insert into comment(userName,content,source) values(?,?,"icezam")' // writing date 추가 필요
const updateCommentSQL = 'update comment set content=?, where id=?'
const deleteCommentSQL = 'delete from comment where id=?'

export const Mutation: MutationResolvers = {
  createComment: (_, { input }) => {
    const SQLInsertData = [input.userName, input.content]
    return new Promise((resolve, reject) => {
      connection.query(
        insertCommentSQL,
        SQLInsertData,
        (err: Error | null, row: any, cols: any) => {
          if (err) {
            reject(err)
          }
          resolve(true)
        }
      )
    })
  },

  modifyComment: (_, { input }) => {
    const SQLUpdateData = [input.content, input.id]
    return new Promise((resolve, reject) => {
      connection.query(
        updateCommentSQL,
        SQLUpdateData,
        (err: Error | null, row: any, cols: any) => {
          if (err) {
            reject(err)
          }
          resolve(true)
        }
      )
    })
  },

  deleteComment: (_, { id }) => {
    return new Promise((resolve, reject) => {
      const SQLDeleteData = [id]
      connection.query(
        deleteCommentSQL,
        SQLDeleteData,
        (err: Error | null, row: any, cols: any) => {
          if (err) {
            reject(err)
          }
          resolve(true)
        }
      )
    })
  },
}
