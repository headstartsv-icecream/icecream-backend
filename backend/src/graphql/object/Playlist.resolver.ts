import { PlaylistResolvers } from '../generated/graphql'
import { Music } from './Music.resolver'

export const Playlist: PlaylistResolvers = {
  id: (playlist) => {
      return `${playlist.id}`
  },

  name: (playlist) => {
    return `${playlist.name}`
  },

  musics: (playlist) => {
      return playlist.musics ? playlist.musics : null
  },
}
