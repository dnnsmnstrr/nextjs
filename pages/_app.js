// pages/_app.js
import './styles.css'
import 'swagger-ui-react/swagger-ui.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
