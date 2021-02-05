import getPlaylist from './getPlaylist'

export default async (req, res) => {
  const playlists = await getPlaylist()
  res.statusCode = 200
  res.json(playlists)
}
