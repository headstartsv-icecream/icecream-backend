import { DateTimeResolver } from 'graphql-scalars'
import { UserResolvers } from '../generated/graphql'

export const User: UserResolvers = {
  name: (user) => {
    return `${user.name}`
  },
}

export const DateTime = DateTimeResolver
