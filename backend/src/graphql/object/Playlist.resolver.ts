import { PlaylistResolvers } from '../generated/graphql'

const sql = 'select * from playlist '

export const Playlist: PlaylistResolvers = {
  id: (playlist) => {
      return `${playlist.id}`
  },

  name: (playlist) => {
    return `${playlist.name}`
  },

  musics: (playlist) => {
      return playlist.musics
  },
}
