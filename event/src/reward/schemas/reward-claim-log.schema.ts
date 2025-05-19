import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as Document } from 'mongoose';

@Schema({ timestamps: true })
export class RewardClaimLogModel extends Document {

    //@Prop({ required: true, enum: Object.values(GeneralRewardType) })
    //rewardType: GeneralRewardType;

    @Prop({ required: true })
    userId: number;

    @Prop({ required: true })
    eventId: number;

    @Prop({ required: true, default: false })
    success: boolean;
}

export const RewardClaimSchema = SchemaFactory.createForClass(RewardClaimLogModel);
