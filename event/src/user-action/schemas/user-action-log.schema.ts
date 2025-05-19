import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { UserActionType } from '../constants/user-action.enum'

@Schema({ timestamps: true })
export class UserActionModel extends Document {

  @Prop({ required: true, enum: Object.values(UserActionType) })
  type: UserActionType;

  @Prop({ required: true })
  userId: number;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  metadata: Record<string, any>;
}

export const UserActionSchema = SchemaFactory.createForClass(UserActionModel);
