import { GeneralUserActionLogs } from "src/user-action/types/general-user-action-logs.type";
import { UserActionType } from "../../user-action/constants/user-action.enum";
import { ConditionChecker } from "../interfaces/condition-checker.interface";
import { UserActionMetadata } from "../../user-action/interfaces/user-action-log-metadata.interface";

export class QuestCheckCondition implements UserActionMetadata, ConditionChecker {

    userActionType: UserActionType;
    metadata: Record<string, any>;

    constructor(questId: number) {
        this.userActionType = UserActionType.QUEST;
        this.metadata = { questId: questId };
    }

    async check(userActionLogs: GeneralUserActionLogs[]): Promise<boolean> {
        return userActionLogs.some(
            log => log.userActionType === UserActionType.QUEST &&
                log.metadata.questId === this.metadata.questId
        );
    }
}