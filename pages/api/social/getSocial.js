import getGist from '../getGist'

const SOCIAL_GIST = '09a2559a9a970de5e8e9e5c2eaf1183b'

export default async (type = '') => {
  return getGist(SOCIAL_GIST, type)
}
