import { CommentResolvers } from '../generated/graphql'

export const Comment: CommentResolvers = {
    id: (comment) => {
        return `${comment.id}`
    },
  
    creationDate: (comment) => {
      return `${comment.creationDate}`
    },
  
    modificationDate: (comment) => {
        return `${comment.modificationDate}`
    },

    content: (comment) => {
        return `${comment.content}`
    },

    userName: (comment) => {
        return `${comment.userName}`
    },

    source: (comment) => {
        return comment.source
    },

    likeCount: (comment) => {
        return Number(comment.likeCount)
    },
}
