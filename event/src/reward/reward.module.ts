import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { EventModule } from 'src/event/event.module';
import { ItemRewardSchema } from './schemas/item-reward.schema';
import { RewardClaimSchema } from './schemas/reward-claim-log.schema';
import { UserActionModule } from 'src/user-action/user-action.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ItemReward', schema: ItemRewardSchema },
      { name: 'RewardClaim', schema: RewardClaimSchema },
    ]),
    EventModule,
    UserActionModule,
  ],
  controllers: [RewardController],
  providers: [RewardService],
  exports: [RewardService],
})
export class RewardModule { }
