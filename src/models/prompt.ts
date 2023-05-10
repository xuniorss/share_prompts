import { Document, Model, model, models, Schema } from 'mongoose'

export interface PromptProps extends Document {
   creator: Schema.Types.ObjectId
   prompt: string
   tag: string
}

const PromptSchema = new Schema<PromptProps, Model<PromptProps>>({
   creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
   prompt: {
      type: String,
      required: true,
   },
   tag: {
      type: String,
      required: true,
   },
})

const Prompt: Model<PromptProps> =
   models.Prompt || model<PromptProps>('Prompt', PromptSchema)

export default Prompt
