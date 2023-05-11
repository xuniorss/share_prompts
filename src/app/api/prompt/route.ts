import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

type CreatorProps = {
   _id: string
   email: string
   username: string
   image: string
   __v: number
}

export type PromptRequestProps = {
   _id: string
   creator: CreatorProps
   prompt: string
   tag: string
   __v: number
}

export const GET = async (req: Request) => {
   try {
      await connectToDB()
      const prompts: Array<PromptRequestProps> = await Prompt.find({}).populate(
         'creator'
      )

      return new Response(JSON.stringify(prompts), { status: 200 })
   } catch (error) {
      return new Response('Failed to fetch all prompts', { status: 500 })
   }
}
