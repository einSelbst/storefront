import NextAuth from 'next-auth'
import ZitadelProvider from 'next-auth/providers/zitadel'
// import AppleProvider from 'next-auth/providers/apple'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from "next-auth/providers/email"

// @see https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/providers/zitadel.ts
export default NextAuth({
  providers: [
    ZitadelProvider({
      issuer: process.env.ZITADEL_ISSUER!,
      clientId: process.env.ZITADEL_CLIENT_ID!,
      clientSecret: process.env.ZITADEL_CLIENT_SECRET!,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          loginName: profile.preferred_username,
          image: profile.picture,
        }
      },
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // Sign in with passwordless email link
    // EmailProvider({
    // server: process.env.MAIL_SERVER,
    // from: "<no-reply@example.com>",
    // }),
  ],
})
