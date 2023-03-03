import { createClient, Operations } from '../components/generated/client'

import { createHooks } from '@wundergraph/react-query'

export const client = createClient({
  baseURL: 'https://storefront.wundergraph.dev',
  // baseURL: process.env.WG_PUBLIC_NODE_URL,
})

export const {
  useQuery,
  useMutation,
  useSubscription,
  useUser,
  useAuth,
  queryKey,
} = createHooks<Operations>(client)
