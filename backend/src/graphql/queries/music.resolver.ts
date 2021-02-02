import { QueryResolvers } from '../../graphql/generated/graphql'
import { connection } from '../../database/mysql'
import { type } from 'os'

const musicsSQL = 'select * from music'
const musicSQL = 'select * from music where id=?'
const musicByTitleArtistSQL = 'select * from music where title like ? and artist like ?'

export const Query: QueryResolvers = {
  musics: () => {
    return new Promise((resolve, reject) => {
      connection.query(musicsSQL, (err: Error, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }

        resolve(
          rows.map((row: any, index: number) => ({
            id: row.id,
            creationDate: row.creationDate,
            title: row.title,
            // artists: ,
            searchCount: row.searchCount,
            albumImage: row.albumIage,
            albumColor: row.albumColor,
            // artistImage: ,
            // genres: row.genre,
            // lyrics: row.lyric
            melonLink: row.melonLink,
            shazamID: row.shazamID,
            youtubeLink: row.youtubeLink,
            youtubeImage: row.youtubeImage,
          }))
        )
      })
    })
  },

  music: (_, { id }) => {
    return new Promise((resolve, reject) => {
      connection.query(musicSQL, [id], (err: Error | null, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }

        const row = rows[0]
        resolve({
          id: row.id,
          creationDate: row.creationDate,
          title: row.title,
          artists: row.artist,
          searchCount: row.searchCount,
          albumImage: row.albumImage,
          albumColor: row.albumColor,
          // artistImage: ,
          // genres: row.genre,
          // lyrics: row.lyric,
          melonLink: row.melonLink,
          shazamId: row.shazamId,
          youtubeLink: row.youtubeLink,
          youtubeImage: row.youtubeImage,
        })
      })
    })
  },

  musicByTitleArtist: (_, { title, artist }) => {
    title = '%' + title.replace(' ', '%') + '%'
    return new Promise((resolve, reject) => {
      connection.query(
        musicByTitleArtistSQL,
        [title, artist],
        (err: Error | null, rows: any, cols: any) => {
          if (err) {
            reject(err)
          }

          console.log(rows)
          const row = rows[0]
          resolve({
            id: row.id,
            creationDate: row.creationDate,
            title: row.title,
            artists: row.artist,
            searchCount: row.searchCount,
            albumImage: row.albumImage,
            albumColor: row.albumColor,
            // artistImage: ,
            // genres: row.genre,
            // lyrics: row.lyric,
            melonLink: row.melonLink,
            shazamId: row.shazamId,
            youtubeLink: row.youtubeLink,
            youtubeImage: row.youtubeImage,
          })
        }
      )
    })
  },
}
