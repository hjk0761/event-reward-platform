import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { UserActionType } from '../../user-action/constants/user-action.enum'

@Schema({ timestamps: true })
export class EventModel extends Document {

  @Prop({ required: true, enum: Object.values(UserActionType) })
  type: UserActionType;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  metadata: Record<string, any>;

  @Prop({ required: true })
  eventId: number;

  @Prop({ required: true })
  startAt: string;

  @Prop({ required: true })
  endAt: string;

  @Prop({ required: true })
  activated: boolean;
}

export const EventSchema = SchemaFactory.createForClass(EventModel);
