import { UserResolvers } from '../generated/graphql'

export const User: UserResolvers = {
  name: (user) => {
    return `${user.name}`
  },

  id: (user) => {
    return `${user.id}`
  },

  age: (user) => {
    return user.age
  },

  creationDate: (user) => {
    return `${user.creationDate}`
  },
}
