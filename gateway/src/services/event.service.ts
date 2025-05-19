import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { UserActionType } from 'src/constants/user-action.enum';

@Injectable()
export class EventService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    async doUserAction(type: UserActionType, userId: number, metadata: Record<string, any>) {
        const body = {
            type: type,
            userId: userId,
            metadata: metadata
        };
        const response = await firstValueFrom(
            this.httpService.post(process.env.EVENT_URI + '/user-action/do', body),
        );
        return response.data;
    }

    async findUserActionByUserId(userId: number) {
        const url = `/user-action/find/${userId}`;
        const uri = process.env.EVENT_URI + url;
        const response = await firstValueFrom(
            this.httpService.get(uri),
        );
        return response.data;
    }

    async createEvent(type: UserActionType, metadata: Record<string, any>, eventId: number, startAt: string, endAt: string, activated: boolean) {
        const body = {
            type: type,
            metadata: metadata,
            eventId: eventId,
            startAt: startAt,
            endAt: endAt,
            activated: activated
        };
        const response = await firstValueFrom(
            this.httpService.post(process.env.EVENT_URI + '/event/create', body),
        );
        return response.data;
    }

    async findEventById(eventId: number) {
        const url = `/event/find/${eventId}`;
        const uri = process.env.EVENT_URI + url;
        const response = await firstValueFrom(
            this.httpService.get(uri),
        );
        return response.data;
    }

    async findAllEvent() {
        const url = `/event/findAll`;
        const uri = process.env.EVENT_URI + url;
        const response = await firstValueFrom(
            this.httpService.get(uri),
        );
        return response.data;
    }

    async changeEventActivation(eventId: number, activated: boolean) {
        const body = {
            eventId: eventId,
            activated: activated
        };
        const response = await firstValueFrom(
            this.httpService.put(process.env.EVENT_URI + '/event/changeActivation', body),
        );
        return response.data;
    }

    async createReward(eventId: number, metadata: Record<string, any>[]) {
        const body = {
            eventId: eventId,
            metadata: metadata
        };
        const response = await firstValueFrom(
            this.httpService.post(process.env.EVENT_URI + '/reward/create', body),
        );
        return response.data;
    }

    async findRewardByEventId(eventId: number) {
        const url = `/reward/findAll/${eventId}`;
        const uri = process.env.EVENT_URI + url;
        const response = await firstValueFrom(
            this.httpService.get(uri),
        );
        return response.data;
    }

    async findReward() {
        const url = `/reward/findAll`;
        const uri = process.env.EVENT_URI + url;
        const response = await firstValueFrom(
            this.httpService.get(uri),
        );
        return response.data;
    }

    async claimReward(userId: number, eventId: number) {
        const body = {
            userId: userId,
            eventId: eventId
        };
        const response = await firstValueFrom(
            this.httpService.post(process.env.EVENT_URI + '/reward/claimReward', body),
        );
        return response.data;
    }

    async findClaimByUserId(userId: number) {
        const url = `/reward/findClaim/${userId}`;
        const uri = process.env.EVENT_URI + url;
        const response = await firstValueFrom(
            this.httpService.get(uri),
        );
        return response.data;
    }

    async findAllClaims() {
        const url = `/reward/findAllClaim`;
        const uri = process.env.EVENT_URI + url;
        const response = await firstValueFrom(
            this.httpService.get(uri),
        );
        return response.data;
    }
}
