import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserActionType } from '../user-action/constants/user-action.enum';
import { EventModel } from '../event/schemas/event.schema';

@Injectable()
export class EventService {

    constructor(
        @InjectModel('Event') private eventModel: Model<EventModel>,
    ) { }

    async createEvent(type: UserActionType, metadata: Record<string, any>, startAt: string, endAt: string, activated: boolean) {
        const created = await this.eventModel.create({ type: type, metadata: metadata, startAt: startAt, endAt: endAt, activated: activated});
        return created;
    }

    async findEvent() {
        const events = await this.eventModel.find();
        return events;
    }

    async findEventByEventId(eventId: number) {
        return await this.eventModel.findOne({ eventId: eventId });
    }

    async changeEventActivation(eventId: string, activated: boolean) {
        const event = await this.eventModel.findOneAndUpdate(
            { _id: eventId },
            { $set: { activated: activated } },
            { new: true}
        );
        return event;
    }
}
