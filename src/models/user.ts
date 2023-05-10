import { Model, model, models, Schema, Document } from 'mongoose'

export interface UserProps extends Document {
   email: string
   username: string
   image: string
}

const UserSchema = new Schema<UserProps, Model<UserProps>>({
   email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
   },
   username: {
      type: String,
      required: [true, 'Username is required!'],
      match: [
         /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
         'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
      ],
   },
   image: {
      type: String,
   },
})

const User: Model<UserProps> =
   models.User || model<UserProps>('User', UserSchema)

export default User
