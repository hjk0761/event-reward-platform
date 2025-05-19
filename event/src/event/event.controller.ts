import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';

import { EventService } from './event.service';
import { EventModel } from './schemas/event.schema';
import { ChangeActivationInfo } from './dto/change-activation.dto';
import { EventInfo } from './dto/event-info.dto';

@Controller('event')
export class EventController {

    constructor(
        private readonly eventService: EventService) { }

    @Post('/create')
    create(@Body() eventInfo: EventInfo): Promise<EventModel> {
        return this.eventService.createEvent(eventInfo.type, eventInfo.metadata, eventInfo.eventId, eventInfo.startAt, eventInfo.endAt, eventInfo.activated);
    }

    @Get('/find/:id')
    find(@Param('id') eventId: number): Promise<EventModel> {
        return this.eventService.findEventByEventId(eventId);
    }

    @Get('/findAll')
    findAll(): Promise<EventModel[]> {
        return this.eventService.findEvent();
    }

    @Put('/changeActivation')
    changeActivtion(@Body() changeActivationInfo: ChangeActivationInfo): Promise<EventModel> {
        return this.eventService.changeEventActivation(changeActivationInfo.eventId, changeActivationInfo.activated);
    }
}
