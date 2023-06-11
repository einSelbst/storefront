import type {
  GetStaticProps,
  GetStaticPropsContext,
} from 'next'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Profile from '../../components/profile'
import styles from '../../styles/Home.module.css'

/* import { log } from 'logger' */
/* import { CounterButton, NewTabLink } from 'ui' */
import { signIn, signOut, useSession } from 'next-auth/react'
import { client } from '../../lib/wundergraph'

/* import React from 'react' */
/* import { dehydrate, QueryClient } from '@tanstack/react-query' */
/* import { Layout, Header, InfoBox, PostList } from '../components' */
/* import { fetchPosts } from '../hooks' */

export const getStaticPaths = async () => {
  /* const paths = getAllBusinesss() */
  /* const cars = await client.query({ operationName: 'AllAutos' }) */
  const cars = await client.query({ operationName: 'AllBusinesses' })
  /* business: allAutos.data.faunaDB_allAutos.data */

  /* const paths = cars!.data!.faunaDB_allAutos.data.map((car: any) => ({ */
  const paths = cars!.data!.faunaDB_allBusinesses.data.map((car: any) => ({
    /* params: { business: car.Make }, */
    params: { business: car.name },
  }))

  console.log('88888888888888888888888888888888')
  console.log(paths)
  /* {JSON.stringify(autos.data.faunaDB_allAutos.data[0], null, 2)} */
  /* return { */
  /* paths: [{ params: { id: '1' } }, { params: { id: '2' } }], */
  /* fallback: false, // can also be true or 'blocking' */
  /* } */
  return {
    paths,
    fallback: false,
    /* fallback: 'blocking',// false, */
  }
}


/* export async function getStaticProps ({ */
/* params, */
/* }: GetStaticPropsContext): Promise<GetStaticPropsResult<PostProps>> { */
/* export async function getStaticProps( */
/* context: GetStaticPropsContext */
/* ): Promise<GetStaticPropsResult<PostProps>> { */
/* ){ */
/* const allAutos = await useQuery({ operationName: 'AllAutos' }) */

/* await Promise.resolve('async needs await') */
/* return { */
/* props: { */
/* id: context.params?.id, */
/* paths */
/* business: allAutos.data.faunaDB_allAutos.data */
/* }, */
/* } */
/* } */
/*
 * export async function getStaticProps3() {
 *   const queryClient = new QueryClient()
 *
 *   await queryClient.prefetchQuery({
 *     queryKey: ['posts', 10],
 *     queryFn: () => fetchPosts(10),
 *   })
 *
 *   return {
 *     props: {
 *       dehydratedState: dehydrate(queryClient),
 *     },
 *   }
 * }
 *  */

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  /* ): Promise<GetStaticPropsResult<HomeProps>> => { */
  /* export async function getStaticProps(context: NextPageContext) { */
  console.log('props==================11111111111111111=====================')

  const extract = await wiki(context!.params!.business! as string)
  console.log('extract')
  console.log(extract)

  const sp = await wikisp()
  console.log('sp')
  console.log(sp)

  /* console.log(context) */
  /* console.log(context!.params!.business) */

  const res = await client.query({
    operationName: 'GetBusinessByName',
    input: { name: context!.params!.business! as string },
    /* operationName: 'AllAutos', */
  })
  /* console.log(JSON.stringify(res.error)) */
  /* const car = res */
  const car = res!.data!.faunaDB_findBusinessByName

  return {
    props: {
      car,
      extract,
    },
  }
}

const wiki = async (pageTitle:string) => {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageprops|info|extracts&exintro=&explaintext=&format=json&titles=${encodeURIComponent(pageTitle)}&origin=*`;

  try {
    const response = await fetch(apiUrl)
    let data
    if (response.ok) {
      data = await response.json();
    } else {
      throw new Error('Failed to fetch data from the Wikipedia API');
    }
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const pageInfo = pages[pageId];

    console.log('Page ID:', pageInfo.pageid);
    console.log('Title:', pageInfo.title);
    console.log('Extract:', pageInfo.extract);

    console.log('Pages:', pages);

    return pageInfo.extract
  } catch(error) {
    console.error('Error:', error);
  }
}

const wikisp = async (limit = 10) => {
  const query = `
    SELECT ?item ?itemLabel WHERE {
      ?item wdt:P31 wd:Q5.
      ?item wdt:P569 ?birthdate.
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    ORDER BY DESC(?birthdate)
    LIMIT ${limit}
  `;

  const url = 'https://query.wikidata.org/sparql';
  const params = new URLSearchParams({ query, format: 'json' });

  try {
    console.log(`${url}?${params.toString()}`);
    const response = await fetch(`${url}?${params.toString()}`);
    const json = await response.json();
    console.log(json)
    const results = json.results.bindings;

    results.forEach((result:any, index:number) => {
      console.log(`${index + 1}. ${result.itemLabel.value} (ID: ${result.item.value})`);
    })
    return results
  } catch (error) {
    console.error('Error fetching data from Wikidata:', error);
  }
}

const Business = ({ car, extract }: any) => {
  /* const Business = () => { */
  /* log('Hey! This is Business.') */
  const { data: session } = useSession()
  /* const autos = useQuery({ operationName: 'AllAutos' }) */
  /* const stores = useQuery({ operationName: 'AllStores' }) */
  /* const dragons = useQuery({ operationName: 'Dragons' }) */
  /* const refresh = () => { stores.mutate() } */
  /* console.log(car) */

  return (
    <div className={styles.container}>
      <Head>
        <title>Store | Kitchen Sink</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{car.display}</h1>

        <div>{extract}</div>
        <div>{JSON.stringify(car)}</div>

        <ul>
          <li>
            <Link href='/'>Business</Link>
          </li>
          <li>
            <Link href='/car'>Car</Link>
          </li>
          <li>
            <Link
              href={{
                pathname: car.wikipedia
              }}>
              {car.wikipedia}
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
          {/* <code className='p-3'>{JSON.stringify(autos, null, 2)}</code> */}
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

export default Business
