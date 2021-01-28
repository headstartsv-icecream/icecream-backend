import { MusicResolvers } from '../generated/graphql'

export const Music: MusicResolvers = {
    id: (music) => {
        return `${music.id}`
    },
  
    title: (music) => {
      return `${music.title}`
    },
  
    artists: (music) => {
        return music.artists
    },

    searchCount: (music) => {
        return music.searchCount
    },

    albumImage: (music) => {
        return `${music.albumImage}`
    },

    artistImage: (music) => {
        return `${music.artistImage}`
    },

    genres: (music) => {
        return music.genres
    },

    lyrics: (music) => {
        return music.lyrics
    },

    melonLink: (music) => {
        return `${music.melonLink}`
    },

    shazamId: (music) => {
        return Number(music.shazamId)
    },

    youtubeLink: (music) => {
        return `${music.youtubeLink}`
    },

    youtubeImage: (music) => {
        return `${music.youtubeImage}`
    },
}