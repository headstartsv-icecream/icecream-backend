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
        return music.genres ? music.genres : null
    },

    lyrics: (music) => {
        return music.lyrics ? music.lyrics : null
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

    artistOtherMusics: (music) => {
        return music.artistOtherMusics ? music.artistOtherMusics : null
    },

    comments: (music) => {
        return music.comments ? music.comments : null
    },

    includedPlaylists: (music) => {
        return music.includedPlaylists ? music.includedPlaylists : null
    },
    
    similarMusics: (music) => {
        return music.similarMusics ? music.similarMusics : null
    }
}