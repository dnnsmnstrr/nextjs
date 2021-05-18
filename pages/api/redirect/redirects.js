import getSocial from '../social/getSocial'
import getPlaylist from '../playlist/getPlaylist'

const DEFAULT_URL = 'https://muensterer.xyz/'
const USERNAME_SHORT = 'dnnsmnstrr'
const USERNAME_FULL = 'dennismuensterer'
const EMAIL = 'dennismuensterer@gmail.com'

const redirects = [
  {
    name: 'homepage',
    url: DEFAULT_URL,
    aliases: ['main', 'root']
  },
  {
    name: 'contact',
    url: 'mailto:' + EMAIL,
    aliases: ['email', 'message', 'mail']
  },
  {
    name: 'github',
    url: 'https://www.github.com/' + USERNAME_SHORT,
    aliases: ['gh', 'hub', 'code', 'repo', 'hack']
  },
  {
    name: 'spotify',
    url: 'https://open.spotify.com/user/' + USERNAME_FULL,
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
    url: 'https://facebook.com/' + USERNAME_FULL,
    aliases: ['fb', 'book', 'gesichtsbuch']
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/' + USERNAME_FULL,
    aliases: ['in', 'linked']
  },
  {
    name: 'paypal',
    url: 'https://www.paypal.com/paypalme/' + USERNAME_FULL,
    aliases: ['pp', 'pay', 'donate', 'sendmoney', 'wheremymoneyat']
  },
  {
    name: 'youtube',
    url: 'https://www.youtube.com/user/' + USERNAME_FULL,
    aliases: ['yt', 'tube', 'videos']
  },
  {
    name: 'zettelkasten',
    url: DEFAULT_URL + 'zettelkasten',
    aliases: ['zk', 'zettel', 'notes', 'slipbox', 'knowlege']
  },
  {
    name: 'dotfiles',
    url: DEFAULT_URL + 'dotfiles',
    aliases: ['df', 'setup', 'dot', 'config']
  },
  {
    name: 'making',
    url: 'https://www.tiktok.com/@dennis.makerer',
    aliases: ['makerer', 'make', 'maker', 'tiktok', 'tt', 'makermonday']
  },
  {
    name: 'universe',
    url: 'https://dnnsmnstrr.onuniverse.com/'
  },
  {
    name: 'felix',
    url: 'https://felixmuensterer.com',
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
    url: DEFAULT_URL + 'humblekeys',
    aliases: ['humble', 'keys', 'games', 'freegames']
  },
  {
    name: 'slides',
    url: 'https://slides.com/' + USERNAME_FULL,
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
  { name: 'api', url: 'https://next.muensterer.xyz/api' },
  { name: 'wg', url: 'https://www.wg-gesucht.de//8616536.html' },
]

const getRedirect = async (route = [], noReturn) => {
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
      redirect = redirects.find(({name, aliases = []}) => {
        return name === query || aliases.includes(query)
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
  // try a page on my website. if not found, it will redirect back here, therefore the 'noReturn' parameter
  const fallback = noReturn ? DEFAULT_URL : (DEFAULT_URL + query)
  return `${redirect && redirect.url ? redirect.url : fallback}${restRoute.reduce((previous, current) => previous + '/' + current, '')}`
}

export default function handler(req, res) {
  const { slug } = req.query
  const body = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>HTML basics</title>
    </head>
    <body>
      <ul>
        ${redirects.map((redirect) => '<li><a href="' + redirect.url + '" >' + redirect.name + '</a></li>').join('')}
      </ul>
    </body>
</html>`

  res.end(body, {headers: new Headers({'Content-Type': 'text/html'})})
}

export {DEFAULT_URL, redirects, getRedirect}
