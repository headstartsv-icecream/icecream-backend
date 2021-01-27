import { PlaylistResolvers } from '../generated/graphql'

export const Playlist: PlaylistResolvers = {
  id: (Playlist) => {
      return `${Playlist.id}`
  },

  name: (Playlist) => {
    return `${Playlist.name}`
  },

  musics: (Playlist) => {
      return `${Playlist.musics}`
  },
}
