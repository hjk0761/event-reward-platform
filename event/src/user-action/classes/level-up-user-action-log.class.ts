import { UserActionMetadata } from "../interfaces/user-action-log-metadata.interface";
import { UserActionType } from "../constants/user-action.enum";
import { UserLog } from "../types/user-log.abstract"

export class LevelUpUserActionLog extends UserLog implements UserActionMetadata {

    userActionType: UserActionType;
    metadata: Record<string, any>;

    constructor(prevLevel: number, curLevel: number, userId: number, createdAt: string, updatedAt: string) {
        super();
        this.userActionType = UserActionType.LEVEL
        this.metadata = { prevLevel: prevLevel, curLevel: curLevel };
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}