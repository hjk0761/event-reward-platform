import { Event } from '../classes/event.class';
import { EventModel } from '../schemas/event.schema';
import { AttendanceCheckCondition } from '../classes/attendance-check-condition.class';
import { FriendAddCountCondition } from '../classes/friend-add-count-condition.class';
import { ItemCheckCondition } from '../classes/item-check-condition.class';
import { LevelDestinationCondition } from '../classes/level-destination-condition.class';
import { LevelUpCountCondition } from '../classes/level-up-count-condition.class';
import { QuestCheckCondition } from '../classes/quest-check-condition.class';
import { UserActionType } from '../../user-action/constants/user-action.enum';
import { GeneralCondition } from '../types/general-condition.type';

export class EventMapper {

    static toEntity(event: Event): Partial<EventModel> {
        return {
            type: event.condition.userActionType,
            metadata: event.condition.metadata,

            eventId: event.eventId,
            startAt: event.startAt,
            endAt: event.endAt,
            activated: event.activated,
        } as Partial<EventModel>;
    }

    static toDomain(eventModel: EventModel): Event {
        return new Event(
            eventModel.eventId,
            this.buildCondition(
                eventModel.type,
                eventModel.metadata,
            ),
            eventModel.startAt,
            eventModel.endAt,
            eventModel.activated,
            (eventModel as any).createdAt,
            (eventModel as any).updatedAt,
        );
    }

    private static buildCondition(
        type: UserActionType,
        metadata: Record<string, any>,
    ): GeneralCondition {
        switch (type) {
            case UserActionType.ATTENDANCE:
                return new AttendanceCheckCondition(metadata.count);

            case UserActionType.FRIEND:
                return new FriendAddCountCondition(metadata.count);

            case UserActionType.ITEM:
                return new ItemCheckCondition(metadata.itemId, metadata.amount, metadata.isGained);

            case UserActionType.LEVEL:
                if (metadata.destinationLevel != null) {
                    return new LevelDestinationCondition(metadata.level);
                }
                return new LevelUpCountCondition(metadata.count);
            case UserActionType.QUEST:
                return new QuestCheckCondition(metadata.questIds);

            default:
                throw new Error(`Unsupported UserActionType: ${type}`);
        }
    }
}
