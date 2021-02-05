import getGist from '../getGist'

const PLAYLIST_GIST = '6d09e7d0d8696eb87460c7d5370bd079'

const getPlaylist = async (type) => {
  return getGist(PLAYLIST_GIST, type)
}

export default async (type = '') => {
  let playlist = await getPlaylist(type)
  console.log('playlist', playlist)
  if (!playlist) {
    playlist = await getPlaylist('current')
  }
  return playlist
}
