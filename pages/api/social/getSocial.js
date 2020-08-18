export default async (type) => {
  const socialUrl = 'https://api.github.com/gists/09a2559a9a970de5e8e9e5c2eaf1183b'
  const response = await fetch(socialUrl)
  const { files } = await response.json()
  const socials = JSON.parse(files['social.json'].content)
  if (type && socials) {
    console.log('type', type)
    return socials[type]
  }
  return socials
}
