import { MusicResolvers } from '../generated/graphql'

export const Music: MusicResolvers = {
    id: (Music) => {
        return `${Music.id}`
    },
  
    title: (Music) => {
      return `${Music.title}`
    },
  
    artists: (Music) => {
        return `${Music.artists}`
    },

    searchCount: (Music) => {
        return `${Music.searchCount}`
    },

    albumImage: (Music) => {
        return `${Music.albumImage}`
    },

    artistImage: (Music) => {
        return `${Music.artistImage}`
    },

    genres: (Music) => {
        return `${Music.genres}`
    },

    lyrics: (Music) => {
        return `${Music.lyrics}`
    },

    melonLink: (Music) => {
        return `${Music.melonLink}`
    },

    shazamId: (Music) => {
        return `${Music.shazamId}`
    },

    youtubeLink: (Music) => {
        return `${Music.youtubeLink}`
    },

    youtubeImage: (Music) => {
        return `${Music.youtubeImage}`
    },
}