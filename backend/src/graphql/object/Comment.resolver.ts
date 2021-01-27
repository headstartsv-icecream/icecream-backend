import { CommentResolvers } from '../generated/graphql'

export const Comment: CommentResolvers = {
    id: (Comment) => {
        return `${Comment.id}`
    },
  
    creationDate: (Comment) => {
      return `${Comment.creationDate}`
    },
  
    crawlingDate: (Comment) => {
        return `${Comment.crawlingDate}`
    },

    content: (Comment) => {
        return `${Comment.content}`
    },

    userName: (Comment) => {
        return `${Comment.userName}`
    },

    source: (Comment) => {
        return `${Comment.source}`
    },

    like: (Comment) => {
        return `${Comment.like}`
    },
}