import { PlaylistResolvers } from '../generated/graphql'

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

