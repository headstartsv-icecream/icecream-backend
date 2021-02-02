import { CommentResolvers } from '../generated/graphql'

export const Comment: CommentResolvers = {
  id: (comment) => {
    return `${comment.id}`
  },

  creationDate: (comment) => {
    return `${comment.creationDate}`
  },

  crawlingDate: (comment) => {
    return `${comment.crawlingDate}`
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

  like: (comment) => {
    return Number(comment.like)
  },
}
