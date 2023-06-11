import {
  authProviders,
  configureWunderGraphApplication,
  cors,
  EnvironmentVariable,
  introspect,
  templates,
} from '@wundergraph/sdk'
import server from './wundergraph.server'
import operations from './wundergraph.operations'

const faunaDB = introspect.graphql({
  apiNamespace: 'faunaDB',
  // url: "https://graphql.eu.fauna.com/graphql",
  url: new EnvironmentVariable('FAUNADB_GRAPHQL_URL'),
  headers: builder => {
    builder.addStaticHeader(
      'Authorization',
      // 'Bearer fnAE4ciN2hAA1gvPF_kV8bzIoYDiTmff3RPejDh8'
      new EnvironmentVariable('FAUNADB_TOKEN')
    )
    return builder
  },
})

const spaceX = introspect.graphql({
  apiNamespace: 'spacex',
  url: 'https://spacex-api.fly.dev/graphql/',
})

const world = introspect.graphql({
  apiNamespace: 'world',
  url: 'https://countries.trevorblades.com',
})

const wikidata = introspect.graphql({
  apiNamespace: 'wiki',
  url: 'https://graphql.toolforge.org/',
})

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [faunaDB, spaceX, world],
  // apis: [faunaDB, spaceX, world, wikidata],
  server,
  operations,
  codeGenerators: [
    {
      templates: [...templates.typescript.all],
    },
    {
      templates: [templates.typescript.client],
      path: '../src/components/generated',
    },
  ],
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === 'production'
    // ? ['https://reifenextrakt-storefront.vercel.app']
        ? ['https://storefront-flax.vercel.app']
        : ['http://localhost:3002'],
  },
  authentication: {
    cookieBased: {
      providers: [authProviders.demo()],
      authorizedRedirectUris: ['http://localhost:3000'],
      secureCookieHashKey: new EnvironmentVariable(
        'WUNDERGRAPH_SECURE_COOKIE_HASH_KEY',
        '00000000000000000000000000000000'
      ), // must be of length 32
      secureCookieBlockKey: new EnvironmentVariable(
        'WUNDERGRAPH_SECURE_COOKIE_BLOCK_KEY',
        '00000000000000000000000000000000'
      ), // must be of length 32
      csrfTokenSecret: new EnvironmentVariable(
        'WUNDERGRAPH_CSRF_TOKEN_SECRET',
        '00000000000'
      ), // must be of length 11
    },
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== 'production',
  },
})
