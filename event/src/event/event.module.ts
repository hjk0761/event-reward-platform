import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EventSchema } from './schemas/event.schema';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Event', schema: EventSchema },
        ]),
    ],
    controllers: [EventController],
    providers: [EventService],
    exports: [EventService],
})
export class EventModule { }
