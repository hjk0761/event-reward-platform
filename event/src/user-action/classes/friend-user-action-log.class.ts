import { UserActionType } from "../constants/user-action.enum";
import { UserActionMetadata } from "../interfaces/user-action-log-metadata.interface";
import { UserLog } from "../types/user-log.abstract"

export class FriendUserActionLog extends UserLog implements UserActionMetadata {

    userActionType: UserActionType;
    metadata: Record<string, any>;

    constructor(friendId: number, isAdded: boolean, userId: number, createdAt: string, updatedAt: string) {
        super();
        this.userActionType = UserActionType.FRIEND;
        this.metadata = { userId: friendId, isAdded: isAdded };
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}