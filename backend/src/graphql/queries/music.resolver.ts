import { QueryResolvers } from '../../graphql/generated/graphql'
import { connection } from '../../database/mysql'

const musicsSQL = 'select * from music'
const musicSQL = 'select * from music where id = $1'
const musicByTitleArtistSQL = 'select * from music where (title = $1 and artist = $2)'

export const Query: QueryResolvers = {
  musics: () => {
    return new Promise((resolve, reject) => {
      connection.query(musicsSQL, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }

        resolve(
          rows.map((row: any, index: number) => ({
            id: index,
            title: row.title,
            artists: row.artist,
            searchCount: row.searchCount,

            albumImage: row.albumImage,
            artistImage: row.artistImage,
            genres: row.genres,
            lyrics: row.lyrics,
            melonLink: row.melonLink,
            shazamId: row.shazamId,
            youtubeLink: row.youtubeLink,
            youtubeImage: row.youtubeImage,
          }))
        )
      })
    })
  },

  music: (_, { id }) => {
    return new Promise((resolve, reject) => {
      connection.query(musicSQL, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }

        const row = rows[+id]
        resolve({
            id: id,
            title: row.title,
            artists: row.artist,
            searchCount: row.searchCount,

            albumImage: row.albumImage,
            artistImage: row.artistImage,
            genres: row.genres,
            lyrics: row.lyrics,
            melonLink: row.melonLink,
            shazamId: row.shazamId,
            youtubeLink: row.youtubeLink,
            youtubeImage: row.youtubeImage,
        })
      })
    })
  },

  musicByTitleArtist: (_, {title, artist}) => {
    return new Promise((resolve, reject) => {
      connection.query(musicByTitleArtistSQL, (err: Error, row: any, cols: any) => {
        if (err) {
          reject(err)
        }

        resolve({
            id: row.id,
            title: row.title,
            artists: row.artist,
            searchCount: row.searchCount,

            albumImage: row.albumImage,
            artistImage: row.artistImage,
            genres: row.genres,
            lyrics: row.lyrics,
            melonLink: row.melonLink,
            shazamId: row.shazamId,
            youtubeLink: row.youtubeLink,
            youtubeImage: row.youtubeImage,
        })
      })
    })
  },
}
