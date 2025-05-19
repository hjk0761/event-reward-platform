import { GeneralUserActionLogs } from "../../user-action/types/general-user-action-logs.type";

export interface ConditionChecker {
    check(userActionLog: GeneralUserActionLogs[]): Promise<boolean>;
}