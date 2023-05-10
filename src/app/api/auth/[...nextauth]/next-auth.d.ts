import NextAuth from 'next-auth'

declare module 'next-auth' {
   interface Session {
      user: {
         id: string | null | undefined
         email: string | null | undefined
         image: string
         name: string | null | undefined
      }
   }
}
