import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Reward } from '../types/reward.type';

@Schema({ timestamps: true })
export class ItemRewardModel extends Document implements Reward {

  @Prop({ required: true })
  eventId: string;

  @Prop({
    type: [{ itemId: Number, amount: Number }],
    required: true,
  })
  metadata: { itemId: number; amount: number }[];
}

export const ItemRewardSchema = SchemaFactory.createForClass(ItemRewardModel);
