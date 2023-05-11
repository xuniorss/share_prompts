import { PromptRequestProps } from '@app/api/prompt/route'
import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const GET = async (
   req: Request,
   { params }: { params: { id: string } }
) => {
   try {
      await connectToDB()
      const prompts: Array<PromptRequestProps> = await Prompt.find({
         creator: params.id,
      }).populate('creator')

      return new Response(JSON.stringify(prompts), { status: 200 })
   } catch (error) {
      return new Response('Failed to fetch all prompts', { status: 500 })
   }
}
