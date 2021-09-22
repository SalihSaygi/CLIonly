import { Schema, model, Model, Document, Types } from 'mongoose';

interface IUser {
    githubId: string;
    displayName: string;
    socialTokens: Array<Types.ObjectId> | Array<IUserDoc>;
}

interface IUserDoc extends IUser, Document {

}

const UserSchemaFields: Record<keyof IUser, any> = {
    githubId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    socialTokens: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Token',
      },
    ]
  }

const UserSchema = new Schema(UserSchemaFields);

const User = model<IUserDoc>('User', UserSchema)

export {User, IUser}