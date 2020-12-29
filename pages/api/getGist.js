export default async (gistId, attribute = '', filename = 'response.json') => {
  if (!gistId) {
    throw new Error('missing gist id')
  }
  const gistUrl = `https://api.github.com/gists/${gistId}`
  try {
    const response = await fetch(gistUrl)
    const { files } = await response.json()
    const gist = JSON.parse(files[filename].content)
    if (gist && attribute) {
      return gist[attribute]
    }
    return gist
  } catch (err) {
    console.error('failed to get gist with id ' + gistId, err)
  }
}
