import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
const handler = NextAuth({
  providers: [
    Github({
      clientId: '0ba9f4f7fd7c1abde987',
      clientSecret: '9ae65a4bbc8881f68b3169055365fe090844210a'
    })
  ]
})

export { handler as GET, handler as POST }
