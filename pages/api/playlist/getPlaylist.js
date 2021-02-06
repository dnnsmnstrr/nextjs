import getGist from '../getGist'

const PLAYLIST_GIST = '6d09e7d0d8696eb87460c7d5370bd079'

const getPlaylist = async (type = '') => {
  return getGist(PLAYLIST_GIST, type)
}

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

export default async (type = '') => {
  if (type === 'random') {
    const playlists = await getPlaylist()
    return randomProperty(playlists)
  }
  let playlist = await getPlaylist(type)
  if (!playlist) {
    playlist = await getPlaylist('current')
  }
  return playlist
}
