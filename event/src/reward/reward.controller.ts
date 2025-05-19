import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';

import { RewardService } from './reward.service';
import { RewardClaimLogModel } from './schemas/reward-claim-log.schema';
import { ItemRewardModel } from './schemas/item-reward.schema';
import { RewardInfo } from './dto/reward-info.dto';
import { ClaimRewardInfo } from './dto/claim-info.dto';

@Controller('reward')
export class RewardController {

    constructor(
        private readonly rewardService: RewardService) { }

    @Post('/create')
    create(@Body() rewardInfo: RewardInfo): Promise<ItemRewardModel> {
        return this.rewardService.createReward(rewardInfo.eventId, rewardInfo.metadata);
    }

    @Get('/findAll/:id?')
    find(@Param('id') eventId?: string): Promise<ItemRewardModel[]> {
        return this.rewardService.findAllRewards(eventId);
    }

    @Post('/claimReward')
    claimReward(@Body() claimRewardInfo: ClaimRewardInfo): Promise<void> {
        return this.rewardService.claimEventReward(claimRewardInfo.userId, claimRewardInfo.eventId);
    }

    @Get('/findClaim/:id')
    findClaimForUser(@Param('id') userId: string): Promise<RewardClaimLogModel[]> {
        return this.rewardService.findClaimForUser(userId);
    }

    @Get('/findAllClaim')
    findAllClaim(): Promise<RewardClaimLogModel[]> {
        return this.rewardService.findClaim();
    }
}
