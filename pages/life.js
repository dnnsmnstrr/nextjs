import React from 'react'
import Link from 'next/link'
import LifeTimeline from '../components/LifeTimeline'

export async function getStaticProps(context) {
  const response = await fetch('https://next.muensterer.xyz/api/events')
  const events = await response.json()
  return {
    props: {events}, // will be passed to the page component as props
  }
}

export default function Life ({ events = [] }) {
  return (
    <div>
      <div>About us</div>
      <div>
        Back to{' '}
        <Link href="/" as={process.env.BACKEND_URL || '' + '/'}>
          <a>Home</a>
        </Link>
        <h1>Dennis Muensterer - Life by Weeks</h1>
        <LifeTimeline
          subject={{ name: 'Dennis', birthday: new Date('1997-06-16') }}
          events={events}
        />
      </div>
    </div>
  )
}
