import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import '@/envConfig'

const handler = NextAuth({
  providers: [
    Github({
      // these should not be hardcoded in a real app, but for the sake of this example we will hardcode them
      clientId: '0ba9f4f7fd7c1abde987',
      clientSecret: '9ae65a4bbc8881f68b3169055365fe090844210a'
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
