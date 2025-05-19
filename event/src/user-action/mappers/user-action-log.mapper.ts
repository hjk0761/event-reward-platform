import { UserActionModel } from '../schemas/user-action-log.schema';
import { AttendanceUserActionLog } from '../classes/attendance-user-action-log.class';
import { FriendUserActionLog } from '../classes/friend-user-action-log.class';
import { ItemUserActionLog } from '../classes/item-user-action-log.class';
import { LevelUpUserActionLog } from '../classes/level-up-user-action-log.class';
import { QuestUserActionLog } from '../classes/quest-user-action-log.class';
import { UserActionType } from '../constants/user-action.enum';

export class UserActionMapper {

    static toEntity(domain: AttendanceUserActionLog | FriendUserActionLog | ItemUserActionLog | LevelUpUserActionLog | QuestUserActionLog): Partial<UserActionModel> {
        return {
            type: domain.userActionType,
            userId: domain.userId,
            metadata: domain.metadata,
        } as Partial<UserActionModel>;
    }

    static toDomain(model: UserActionModel): AttendanceUserActionLog | FriendUserActionLog | ItemUserActionLog | LevelUpUserActionLog | QuestUserActionLog {
        const type = model.type;
        const userId = model.userId;
        const metadata = model.metadata;
        const createdAt = (model as any).createdAt;
        const updatedAt = (model as any).updatedAt;

        switch (type) {
            case UserActionType.ATTENDANCE:
                return new AttendanceUserActionLog(
                    metadata.date,
                    userId,
                    createdAt?.toISOString(),
                    updatedAt?.toISOString(),
                );

            case UserActionType.FRIEND:
                return new FriendUserActionLog(
                    metadata.userId,
                    metadata.isAdded,
                    userId,
                    createdAt?.toISOString(),
                    updatedAt?.toISOString(),
                );

            case UserActionType.ITEM:
                return new ItemUserActionLog(
                    metadata.itemId,
                    metadata.amount,
                    metadata.isGained,
                    userId,
                    createdAt?.toISOString(),
                    updatedAt?.toISOString(),
                );

            case UserActionType.LEVEL:
                return new LevelUpUserActionLog(
                    metadata.prevLevel,
                    metadata.curLevel,
                    userId,
                    createdAt?.toISOString(),
                    updatedAt?.toISOString(),
                );

            case UserActionType.QUEST:
                return new QuestUserActionLog(
                    metadata.questId,
                    userId,
                    createdAt?.toISOString(),
                    updatedAt?.toISOString(),
                );

            default:
                throw new Error(`Unsupported UserActionType: ${type}`);
        }
    }
}
