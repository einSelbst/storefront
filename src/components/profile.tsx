import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Profile() {
  const { data: session, status } = useSession()

  const loading = status === 'loading'

  return (
    <>
      {!session && (
        <>
          <p>Not signed in</p>
          <br />

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
          <p>
            Signed in as {session.user!.name!}
            <br />
          </p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  )
}
