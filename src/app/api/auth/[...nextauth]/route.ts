import User, { UserProps } from '@models/user'
import { connectToDB } from '@utils/database'
import NextAuth, { Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
   ],

   callbacks: {
      async session({ session }) {
         const sessionUser = await User.findOne({
            email: session.user?.email,
         })

         session.user.id = sessionUser?._id.toString()

         return session
      },

      async signIn({ account, profile, user, credentials }) {
         try {
            await connectToDB()

            // check if user already exists
            const userExists = await User.findOne({
               email: profile?.email,
            })

            // if not, create a new user
            if (!userExists) {
               await User.create({
                  email: profile?.email,
                  username: profile?.name?.replace(' ', '').toLowerCase(),
                  //@ts-ignore
                  image: profile?.picture,
               })
            }

            return true
         } catch (error) {
            console.error(error)
            return false
         }
      },
   },
})

export { handler as GET, handler as POST }
