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

@Injectable()
export class RewardService {

    constructor(
        @InjectModel('ItemReward') private itemRewardModel: Model<ItemRewardModel>,
        @InjectModel('RewardClaim') private rewardClaimModel: Model<RewardClaimLogModel>,
        private readonly userActionService: UserActionService,
        private readonly eventService: EventService,
    ) { }

    async createReward(eventId: number, metadata: { itemId: number, amount: number }[]) {
        const created = new this.itemRewardModel({ eventId: eventId, metadata: metadata })
        return await created.save();
    }

    async findAllRewards(eventId?: number) {
        if (eventId != null) {
            return await this.itemRewardModel.find({ eventId: eventId });
        }
        return await this.itemRewardModel.find();
    }

    async claimEventReward(userId: number, eventId: number) {
        const eventEntity = await this.eventService.findEventByEventId(eventId);
        if (eventEntity == null) {
            throw new NotFoundException("eventId에 해당하는 이벤트가 없습니다.");
        }
        const event = EventMapper.toDomain(eventEntity);
        const logsEntity = await this.userActionService.findAllByUserId(userId);
        console.log("logsEntity: ", logsEntity)
        for (const l of logsEntity) {
            console.log("logEntity: ", l)
        }
        const logs = logsEntity.map((x: UserActionModel) => UserActionMapper.toDomain(x));
        const possible = await event.condition.check(logs);
        console.log("possible: ", possible)
        const prevClaims = await this.rewardClaimModel.find({ userId: userId, eventId: eventId });
        const test = await this.checkPrevClaims(prevClaims);
        console.log("test: ", test)
        const result = possible && test;
        console.log("result: ", result)
        const rewardClaim = new this.rewardClaimModel({ userId: userId, eventId: eventId, success: result });
        await rewardClaim.save();
        if (result) {
            await this.giveReward(userId, eventId);
        }
        return;
    }

    private async checkPrevClaims(prevClaims: RewardClaimLogModel[]) {
        if (prevClaims.length == 0) {
            return true;
        }
        return !prevClaims.some(claim => claim.success === true);
    }

    private async giveReward(userId: number, eventId: number) {
        const rewards = await this.itemRewardModel.find({ eventId: eventId });
        //const rewards = await this.rewardClaimModel.find({ userId: userId, eventId: eventId });
        console.log(rewards);
        const type = UserActionType.ITEM;
        const metadatas = []
        for (const reward of rewards) {
            for (const re of reward.metadata) {
                const me = {
                    itemId: re.itemId,
                    amount: re.amount,
                    isGained: true
                };
                metadatas.push(me);
            };
        };
        await this.userActionService.do(type, userId, metadatas);
        return;
    }

    async findClaimForUser(userId: number) {
        const claims = await this.rewardClaimModel.find({ userId: userId });
        return claims;
    }

    async findClaim() {
        const claims = await this.rewardClaimModel.find();
        return claims;
    }
}
