import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Profile from '../components/profile'
import styles from '../styles/Home.module.css'

/* import { log } from 'logger' */
/* import { CounterButton, NewTabLink } from 'ui' */
import { signIn, signOut, useSession } from 'next-auth/react'
import { useQuery } from '../lib/wundergraph'

/* function Home() { */
const Home: NextPage = () => {
  /* log('Hey! This is Home.') */
  const { data: session } = useSession()
  /* const autos = useQuery({ operationName: 'AllAutos' }) */
  /* const stores = useQuery({ operationName: 'AllStores' }) */
  /* const dragons = useQuery({ operationName: 'Dragons' }) */
  /* const refresh = () => { stores.mutate() } */

  return (
    <div className={styles.container}>
      <Head>
        <title>Store | Kitchen Sink</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <a href='https://github.com/zitadel/zitadel-examples/tree/main/nextjs'>
            Next.js with ZITADEL! and WunderGraph and Fauna
          </a>
        </h1>

        {/* <div>{JSON.stringify(dragons.data)}</div> */}
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/car'>Car</Link>
          </li>
          <li>
            <Link
              href={{
                pathname: '/[brand]',
                query: { brand: 'ford' },
              }}>
              Blog Post
            </Link>
          </li>
        </ul>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
        {!session && (
          <>
            Not signed in <br />
            <button
              onClick={() =>
                signIn('zitadel', {
                  callbackUrl: process.env.ZITADEL_CALLBACK_URL!,
                })
              }>
              Sign in
            </button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user!.email!} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}

        <Profile />

        {/* <CounterButton /> */}

        <div className='mx-auto flex max-w-sm flex-col items-center'>
          <p className='mt-3 mb-8 text-center text-black/80'>
            This is the result of your{' '}
            <code className='font-mono font-medium text-amber-500 font-bold'>
              AllStores
            </code>{' '}
            operation.
          </p>
          <code className='p-3'>
            {/* {JSON.stringify(autos.data.faunaDB_allAutos.data[0], null, 2)} */}
          </code>
          <code className='p-3'>
            {/* {autos.data.faunaDB_allAutos.data[0].Make} */}
          </code>
        </div>

        <p className='description'>
          Built With{' '}
          {/* <NewTabLink href='https://turbo.build/repo'>Turborepo</NewTabLink> +{' '} */}
          {/* <NewTabLink href='https://nextjs.org/'>Next.js</NewTabLink> */}
        </p>
      </main>

      <footer className={styles.footer}>
        <a href='https://zitadel.ch' target='_blank' rel='noopener noreferrer'>
          Powered by{' '}
          <span className={styles.logo}>
            <Image
              src='/zitadel-logo-dark.svg'
              alt='Zitadel Logo'
              height={40}
              width={147.5}
            />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
