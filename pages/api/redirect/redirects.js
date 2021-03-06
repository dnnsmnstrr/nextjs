import getSocial from '../social/getSocial'
import getPlaylist from '../playlist/getPlaylist'
import {
  DEFAULT_URL,
  USERNAME,
  USERNAME_SHORT,
  EMAIL
} from '../../../config'

// no url means the redirect will be built out of the default url and the given name
const redirects = [
  {
    name: 'homepage',
    url: DEFAULT_URL, //required to override default behaviour
    aliases: ['home', 'main', 'root']
  },
  {
    name: 'contact',
    url: 'mailto:' + EMAIL,
    aliases: ['email', 'message', 'mail']
  },
  {
    name: 'github',
    url: 'https://www.github.com/' + USERNAME_SHORT,
    aliases: ['gh', 'git', 'hub', 'code', 'repo', 'hack']
  },
  {
    name: 'gitlab',
    url: 'https://www.gitlab.com/' + USERNAME_SHORT,
    aliases: ['gl', 'lab',]
  },
  {
    name: 'spotify',
    url: 'https://open.spotify.com/user/' + USERNAME,
    aliases: ['music', 'sp', 'spot',]
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/' + USERNAME_SHORT,
    aliases: ['insta', 'gram', 'ig', 'nofilter', 'pictures', 'photos', 'stories']
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/' + USERNAME_SHORT,
    aliases: ['tw', 'tweet', 'tweets']
  },
  {
    name: 'facebook',
    url: 'https://facebook.com/' + USERNAME,
    aliases: ['fb', 'book', 'gesichtsbuch']
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/' + USERNAME,
    aliases: ['in', 'linked']
  },
  {
    name: 'paypal',
    url: 'https://www.paypal.com/paypalme/' + USERNAME,
    aliases: ['pp', 'pay', 'donate', 'sendmoney', 'wheremymoneyat']
  },
  {
    name: 'youtube',
    url: 'https://www.youtube.com/user/' + USERNAME,
    aliases: ['yt', 'tube', 'videos']
  },
  {
    name: 'zettelkasten',
    aliases: ['zk', 'zettel', 'notes', 'slipbox', 'knowlege']
  },
  {
    name: 'dotfiles',
    aliases: ['df', 'setup', 'dot', 'config']
  },
  {
    name: 'making',
    url: 'https://www.tiktok.com/@dennis.makerer',
    aliases: ['makerer', 'make', 'maker', 'tiktok', 'tt', 'makermonday']
  },
  {
    name: 'toolshare',
    url: 'https://toolsharewith.me',
    aliases: ['tools', 'tool']
  },
  {
    name: 'universe',
    url: 'https://dnnsmnstrr.onuniverse.com'
  },
  {
    name: 'felix',
    url: 'https://fm-branding.de/',
    aliases: ['lancemax', 'brother', 'dumbass']
  },
  {
    name: 'wishlist',
    url: 'https://www.amazon.de/hz/wishlist/ls/1Y2URDXEYY1JO',
    aliases: ['wish', 'gift', 'birthday']
  },
  {
    name: 'kickstarter',
    url: 'https://www.kickstarter.com/profile/dennismuensterer',
    aliases: ['ks', 'crowdfunding', 'backed']
  },
  {
    name: 'steam',
    url: 'https://steamcommunity.com/id/' + USERNAME_SHORT,
    aliases: ['gaming', 'play', 'zocken']
  },
  {
    name: 'humblekeys',
    aliases: ['humble', 'keys', 'games', 'freegames']
  },
  {
    name: 'slides',
    url: 'https://slides.com/' + USERNAME,
    aliases: ['presentation', 'slide', 'present']
  },
  {
    name: 'telegram',
    url: 'https://t.me/' + USERNAME_SHORT,
    aliases: ['tg', 'tele']
  },
  { name: 'stickers', url: 'https://t.me/addstickers/memesterer' },
  { name: 'masks', url: 'https://t.me/addstickers/maskerer' },
  { name: 'reddit', url: 'https://www.reddit.com/user/themissing_link' },
  { name: 'discord', url: 'https://discord.gg/CrB72mXEzN' },
  { name: 'google', url: 'https://www.google.com/search?q=Dennis+Muensterer' },
  { name: 'api', url: 'https://dnnsmnstrr.vercel.app/api/' },
  { name: 'help', url: 'redirects', aliases: ['available', 'urls', 'list'] },
  { name: 'playlists', url: 'universe/playlists' }, //extend existing redirects
  { name: 'insult', url: 'contact?Subject=Fuck%20You%21', aliases: ['hate'] }, //add query params
  { name: 'edit', url: 'github/dnnsmnstrr.github.io' }, //shortcut to website repo
]

const getRedirect = async (route = [], {noReturn, ...restParams} = {}) => {
  const [ query, ...restRoute] = route
  let redirect
  switch (query) {
    case 'random':
      redirect = redirects[Math.floor(Math.random() * redirects.length)]
      break
    case 'social':
      if (restRoute[0]){
        const social = await getSocial(restRoute[0])
        if (typeof(social) === 'string') {
          return social
        }
      }
      break
    case 'playlist':
      if (restRoute[0]){
        const playlist = await getPlaylist(restRoute[0])
        if (playlist) return playlist
      }
      break
    default:
      // search for redirect
      redirect = redirects.find(({name = '', aliases = [], url}) => {
        if (!name) {
          console.log('missing name for', url, aliases)
          return false
        }
        return name === query.toLowerCase() || aliases.includes(query)
      })
      if (!redirect) {
        try {
          const url = await getSocial(query)
          redirect = {url}
        } catch (e) {
          console.log(e)
        }
      }
  }

  return getRedirectURL(redirect, {query, route: restRoute, ...restParams})
}

const getRedirectURL = ({url, name}, {route = [], query, noReturn, ...params} = {}) => {
  const rebuildParams = (params) => {
    const paramList = Object.keys(params).map((param, index) => `${index === 0 ? '?' : '&'}${param}=${params[param]}`)
    return paramList.join('')
  }
  let path = rebuildParams(params)
  if (route && route.length) {
    path = route.reduce((previous, current) => previous + '/' + current, '') + path
  }
  if (url) {
    path = `${url}${path}`
  } else if (name) {
    path = `${DEFAULT_URL}/${name}${path}`
  } else {
    // a failed redirect will end up back here, therefore the 'noReturn' parameter is used to avoid endless loops on redirect attempts
    path = `${DEFAULT_URL}/${!noReturn ? query : ''}`
  }
  return path
}

export default function handler(req, res) {
  const { slug } = req.query
  const sortedRedirects = redirects.sort((a, b) => a.name.localeCompare(b.name))
  const buildList = () => {
    const listItems = sortedRedirects.map((redirect) => (
      `<li><a href="${getRedirectURL(redirect)}" title="${redirect.aliases && redirect.aliases.length ? 'Aliases: ' + redirect.aliases.join(', ') : 'No Aliases'}" >${redirect.name}</a></li>`
    ))
    return listItems.join('')
  }

  const body = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Redirects</title>
    </head>
    <body>
      <h1>Available Redirects</h1>
      <ul>
        ${buildList()}
      </ul>
    </body>
</html>`

  res.end(body, {headers: new Headers({'Content-Type': 'text/html'})})
}

export { redirects, getRedirect }
