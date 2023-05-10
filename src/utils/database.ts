import { connect, set } from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
   set('strictQuery', true)

   if (isConnected) {
      console.log('MongoDB is already connected')
      return
   }

   try {
      const uri = process.env.MONGODB_URL as string
      await connect(uri, { dbName: 'share_prompt' })
      isConnected = true
   } catch (error) {
      console.error(error)
   }
}
