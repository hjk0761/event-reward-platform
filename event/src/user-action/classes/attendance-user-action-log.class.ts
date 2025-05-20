import { UserActionType } from "../constants/user-action.enum";
import { UserActionMetadata } from "../interfaces/user-action-log-metadata.interface";
import { UserLog } from "../types/user-log.abstract";

export class AttendanceUserActionLog extends UserLog implements UserActionMetadata {

    userActionType: UserActionType;
    metadata: Record<string, any>;

    constructor(date: string, userId: string, createdAt: string, updtaedAt: string) {
        super();
        this.userActionType = UserActionType.ATTENDANCE;
        this.metadata = { date: date }
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updtaedAt;
    }
}