import { UserActionMetadata } from "../../user-action/interfaces/user-action-log-metadata.interface";
import { UserActionType } from "../../user-action/constants/user-action.enum";
import { ConditionChecker } from "../interfaces/condition-checker.interface";
import { GeneralUserActionLogs } from "src/user-action/types/general-user-action-logs.type";

export class LevelUpCountCondition implements UserActionMetadata, ConditionChecker {

    userActionType: UserActionType;
    metadata: Record<string, any>;

    constructor(count: number) {
        this.userActionType = UserActionType.LEVEL;
        this.metadata = { count: count }
    }

    async check(userActionLogs: GeneralUserActionLogs[]): Promise<boolean> {
        let count = 0;
        const required = this.metadata.count ?? 0;
        for (const log of userActionLogs) {
            if (log.userActionType === UserActionType.LEVEL) {
                count += 1;
            }
            if (count >= required) {
                return true;
            }
        }
        return false;
    }
}