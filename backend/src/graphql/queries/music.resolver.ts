import { CrawlingSource, QueryResolvers } from '../../graphql/generated/graphql'
import { connection } from '../../database/mysql'
import { type } from 'os'

const musicsSQL = 'select * from music'
const musicSQL = 'select * from music where id=?'
const musicByTitleArtistSQL = 'select * from music where title like ? and artist like ?'
const loadComment = 'select * from comment where musicID=?'
const loadCommentByMusic = 'select * from comment where music like ? and artist like ?'

const selectSource = function (row: any) {
  switch (row.source) {
    case 'youtube':
      return CrawlingSource.Youtube
    case 'melon':
      return CrawlingSource.Melon
    case 'icezam':
      return CrawlingSource.Icezam
    default:
      return CrawlingSource.Icezam
  }
}

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
            artists: row.artist.split(', '),
            searchCount: row.searchCount,
            albumImage: row.albumIage,
            albumColor: row.albumColor,
            // artistImage: ,
            genres: row.genre.split(', '),
            lyrics: row.lyric.split('<br/>'),
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
      let order = false
      let result: any = {}

      connection.query(musicSQL, [id], (err: Error | null, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }

        const row = rows[0]
        result = {
          ...result,
          id: row.id,
          creationDate: row.creationDate,
          title: row.title,
          artists: row.artist.split(', '),
          searchCount: row.searchCount,
          albumImage: row.albumImage,
          albumColor: row.albumColor,
          // artistImage: ,
          genres: row.genre.split(', '),
          lyrics: row.lyric.split('<br/>'),
          melonLink: row.melonLink,
          shazamId: row.shazamId,
          youtubeLink: row.youtubeLink,
          youtubeImage: row.youtubeImage,
        }
        if (order === true) {
          resolve(result)
        } else {
          order = true
        }
      })

      connection.query(loadComment, [id], (err: Error | null, rows: any, cols: any) => {
        if (err) {
          reject(err)
        }

        result = {
          ...result,
          comments: rows.map((row: any, index: number) => ({
            id: row.id,
            creationDate: row.creationDate,
            modificationDate: row.modificationDate,
            writingDate: row.writingDate,
            content: row.content,
            userName: row.userName,
            source: selectSource(row),
          })),
        }
        if (order === true) {
          resolve(result)
        } else {
          order = true
        }
      })
    })
  },

  musicByTitleArtist: (_, { title, artist }) => {
    title = '%' + title.replace(' ', '%') + '%'
    return new Promise((resolve, reject) => {
      let order = false
      let result: any = {}

      connection.query(
        musicByTitleArtistSQL,
        [title, artist],
        (err: Error | null, rows: any, cols: any) => {
          if (err) {
            reject(err)
          }

          const row = rows[0]
          result = {
            ...result,
            id: row.id,
            creationDate: row.creationDate,
            title: row.title,
            artists: row.artist.split(', '),
            searchCount: row.searchCount,
            albumImage: row.albumImage,
            albumColor: row.albumColor,
            // artistImage: ,
            genres: row.genre.split(', '),
            lyrics: row.lyric.split('<br/>'),
            melonLink: row.melonLink,
            shazamId: row.shazamId,
            youtubeLink: row.youtubeLink,
            youtubeImage: row.youtubeImage,
          }
          if (order === true) {
            resolve(result)
          } else {
            order = true
          }
        }
      )
      connection.query(
        loadCommentByMusic,
        [title, artist],
        (err: Error | null, rows: any, cols: any) => {
          if (err) {
            reject(err)
          }

          result = {
            ...result,
            comments: rows.map((row: any, index: number) => ({
              id: row.id,
              creationDate: row.creationDate,
              modificationDate: row.modificationDate,
              writingDate: row.writingDate,
              content: row.content,
              userName: row.userName,
              source: selectSource(row),
            })),
          }
          if (order === true) {
            resolve(result)
          } else {
            order = true
          }
        }
      )
    })
  },
}
