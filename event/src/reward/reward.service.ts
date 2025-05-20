import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserActionModel } from '../user-action/schemas/user-action-log.schema';
import { UserActionType } from '../user-action/constants/user-action.enum';
import { EventMapper } from '../event/mappers/event.mapper';
import { UserActionMapper } from '../user-action/mappers/user-action-log.mapper';
import { ItemRewardModel } from './schemas/item-reward.schema';
import { RewardClaimLogModel } from './schemas/reward-claim-log.schema';
import { UserActionService } from 'src/user-action/user-action.service';
import { EventService } from 'src/event/event.service';
import { EventModel } from 'src/event/schemas/event.schema';

@Injectable()
export class RewardService {

    constructor(
        @InjectModel('ItemReward') private itemRewardModel: Model<ItemRewardModel>,
        @InjectModel('RewardClaim') private rewardClaimModel: Model<RewardClaimLogModel>,
        private readonly userActionService: UserActionService,
        private readonly eventService: EventService,
    ) { }

    async createReward(eventId: string, metadata: { itemId: number, amount: number }[]) {
        const created = new this.itemRewardModel({ eventId: eventId, metadata: metadata })
        return await created.save();
    }

    async findAllRewards(eventId?: string) {
        if (eventId != null) {
            return await this.itemRewardModel.find({ eventId: eventId });
        }
        return await this.itemRewardModel.find();
    }

    async claimEventReward(userId: string, eventId: string) {
        const eventEntity = await this.eventService.findEventByEventId(eventId);
        if (eventEntity == null) {
            throw new NotFoundException("eventId에 해당하는 이벤트가 없습니다.");
        }
        const conditionChecked = await this.checkEventCondition(userId, eventEntity);
        const prevClaimChecked = await this.checkPrevClaims(userId, eventId);
        const possibleToClaim = conditionChecked && prevClaimChecked;
        const rewardClaim = new this.rewardClaimModel({ userId: userId, eventId: eventId, success: possibleToClaim });
        await rewardClaim.save();
        if (possibleToClaim) {
            await this.giveReward(userId, eventId);
        }
        return;
    }

    private async checkEventCondition(userId:string, eventEntity: EventModel): Promise<boolean> {
        const event = EventMapper.toDomain(eventEntity);
        const logsEntity = await this.userActionService.findAllByUserId(userId);
        const logs = logsEntity.map((x: UserActionModel) => UserActionMapper.toDomain(x));
        return await event.condition.check(logs);
    }

    private async checkPrevClaims(userId:string, eventId: string) {
        const prevClaims = await this.rewardClaimModel.find({ userId: userId, eventId: eventId });
        if (prevClaims.length == 0) {
            return true;
        }
        return !prevClaims.some(claim => claim.success === true);
    }

    private async giveReward(userId: string, eventId: string) {
        const rewards = await this.itemRewardModel.find({ eventId: eventId });
        if (rewards == null || rewards.length == 0) {
            throw new NotFoundException("해당 eventId 에 해당하는 보상이 없습니다.");
        }
        const type = UserActionType.ITEM;
        const metadatas = []
        for (const reward of rewards) {
            for (const eachReward of reward.metadata) {
                const itemMetadata = {
                    itemId: eachReward.itemId,
                    amount: eachReward.amount,
                    isGained: true
                };
                metadatas.push(itemMetadata);
            };
        };
        await this.userActionService.do(type, userId, metadatas);
        return;
    }

    async findClaimForUser(userId: string) {
        const claims = await this.rewardClaimModel.find({ userId: userId });
        return claims;
    }

    async findClaim() {
        const claims = await this.rewardClaimModel.find();
        return claims;
    }
}
