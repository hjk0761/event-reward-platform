import { UserActionType } from "../constants/user-action.enum";
import { UserActionMetadata } from "../interfaces/user-action-log-metadata.interface";
import { UserLog } from "../types/user-log.abstract"

export class ItemUserActionLog extends UserLog implements UserActionMetadata {

    userActionType: UserActionType;
    metadata: Record<string, any>;

    constructor(itemId: number, amount: number, isGained: boolean, userId: string, createdAt: string, updatedAt: string) {
        super();
        this.userActionType = UserActionType.ITEM;
        this.metadata = { itemId: itemId, amount: amount, isGained: isGained };
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}