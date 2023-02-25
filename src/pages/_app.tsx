/* import React from 'react' */
import type { AppProps } from 'next/app'
import '../styles.css'
import { SessionProvider } from 'next-auth/react'

import {
  /* Hydrate, */
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
/* const [queryClient] = React.useState(() => new QueryClient()) */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
