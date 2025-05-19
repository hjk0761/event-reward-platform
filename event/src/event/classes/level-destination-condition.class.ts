import { GeneralUserActionLogs } from "src/user-action/types/general-user-action-logs.type";
import { UserActionType } from "../../user-action/constants/user-action.enum";
import { ConditionChecker } from "../interfaces/condition-checker.interface";
import { UserActionMetadata } from "../../user-action/interfaces/user-action-log-metadata.interface";

export class LevelDestinationCondition implements UserActionMetadata, ConditionChecker {

    userActionType: UserActionType;
    metadata: Record<string, any>;

    constructor(destinationLevel: number) {
        this.userActionType = UserActionType.LEVEL;
        this.metadata = { destinationLevel: destinationLevel }
    }

    async check(userActionLogs: GeneralUserActionLogs[]): Promise<boolean> {
        const destination = this.metadata.destinationLevel ?? 0;
        return userActionLogs.some(log =>
            log.userActionType === UserActionType.LEVEL &&
            log.metadata.curLevel >= destination
        );
    }

}