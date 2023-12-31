import type { AppProps } from 'next/app'
import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SessionProvider } from "next-auth/react"
config.autoAddCss = false

 
export default function App({ 
  Component, 
  pageProps: {session, ...pageProps},
}: AppProps) {
  return (
  <SessionProvider session={session}> 
  <Component {...pageProps} />
  </SessionProvider>
  )
}