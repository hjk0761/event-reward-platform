import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as Document } from 'mongoose';

@Schema({ timestamps: true })
export class RewardClaimLogModel extends Document {

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    eventId: string;

    @Prop({ required: true, default: false })
    success: boolean;
}

export const RewardClaimSchema = SchemaFactory.createForClass(RewardClaimLogModel);
