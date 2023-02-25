import { createClient, Operations } from '../components/generated/client'

import { createHooks } from '@wundergraph/react-query'

export const client = createClient({
  baseURL: 'https://cloud-starter.wundergraph.dev',
})

export const {
  useQuery,
  useMutation,
  useSubscription,
  useUser,
  useAuth,
  queryKey,
} = createHooks<Operations>(client)
