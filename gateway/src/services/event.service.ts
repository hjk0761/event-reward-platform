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
            this.httpService.post('http://auth:3002/user-action/do', body),
        );
        return response.data;
    }

    async findUserActionByUserId(userId: number) {
        const url = `http://auth:3002/user-action/find/${userId}`;
        const response = await firstValueFrom(
            this.httpService.get(url),
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
            this.httpService.post('http://auth:3002/event/create', body),
        );
        return response.data;
    }

    async findEventById(eventId: number) {
        const url = `http://auth:3002/event/find/${eventId}`;
        const response = await firstValueFrom(
            this.httpService.get(url),
        );
        return response.data;
    }

    async findAllEvent() {
        const url = `http://auth:3002/event/findAll`;
        const response = await firstValueFrom(
            this.httpService.get(url),
        );
        return response.data;
    }

    async changeEventActivation(eventId: number, activated: boolean) {
        const body = {
            eventId: eventId,
            activated: activated
        };
        const response = await firstValueFrom(
            this.httpService.put('http://auth:3002/event/changeActivation', body),
        );
        return response.data;
    }

    async createReward(eventId: number, metadata: Record<string, any>[]) {
        const body = {
            eventId: eventId,
            metadata: metadata
        };
        const response = await firstValueFrom(
            this.httpService.post('http://auth:3002/reward/create', body),
        );
        return response.data;
    }

    async findRewardByEventId(eventId: number) {
        const url = `http://auth:3002/reward/findAll/${eventId}`;
        const response = await firstValueFrom(
            this.httpService.get(url),
        );
        return response.data;
    }

    async findReward() {
        const url = `http://auth:3002/reward/findAll`;
        const response = await firstValueFrom(
            this.httpService.get(url),
        );
        return response.data;
    }

    async claimReward(userId: number, eventId: number) {
        const body = {
            userId: userId,
            eventId: eventId
        };
        const response = await firstValueFrom(
            this.httpService.post('http://auth:3002/reward/claimReward', body),
        );
        return response.data;
    }

    async findClaimByUserId(userId: number) {
        const url = `http://auth:3002/reward/findClaim/${userId}`;
        const response = await firstValueFrom(
            this.httpService.get(url),
        );
        return response.data;
    }

    async findAllClaims() {
        const url = `http://auth:3002/reward/findAllClaim`;
        const response = await firstValueFrom(
            this.httpService.get(url),
        );
        return response.data;
    }
}
