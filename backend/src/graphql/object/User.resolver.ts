import { UserResolvers } from '../generated/graphql'

export const User: UserResolvers = {
  name: (user) => {
    return `${user.name}`
  },
}
