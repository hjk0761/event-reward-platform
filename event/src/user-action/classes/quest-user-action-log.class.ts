import { UserActionType } from "../constants/user-action.enum";
import { UserActionMetadata } from "../interfaces/user-action-log-metadata.interface";
import { UserLog } from "../types/user-log.abstract"

export class QuestUserActionLog extends UserLog implements UserActionMetadata {

    userActionType: UserActionType;
    metadata: Record<string, any>;

    constructor(questId: number, userId: number, createdAt: string, updatedAt: string) {
        super();
        this.userActionType = UserActionType.QUEST;
        this.metadata = { questId: questId };
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}