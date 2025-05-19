import { UserActionType } from "../../user-action/constants/user-action.enum";
import { ConditionChecker } from "../interfaces/condition-checker.interface";
import { UserActionMetadata } from "../../user-action/interfaces/user-action-log-metadata.interface";
import { GeneralUserActionLogs } from "../../user-action/types/general-user-action-logs.type";

export class ItemCheckCondition implements UserActionMetadata, ConditionChecker {

    userActionType: UserActionType;
    metadata: Record<string, any>;

    constructor(itemId: number, amount: number, isGained: boolean) {
        this.userActionType = UserActionType.ITEM;
        this.metadata = { itemId: itemId, amount: amount, isGained: isGained }
    }

    async check(userActionLogs: GeneralUserActionLogs[]): Promise<boolean> {
        let netAmount = 0;
        for (const log of userActionLogs) {
            if (
                log.userActionType === UserActionType.ITEM &&
                log.metadata.itemId === this.metadata.itemId
            ) {
                const amount = log.metadata.amount ?? 0;
                netAmount += log.metadata.isGained ? amount : -amount;
            }
        }
        const targetAmount = this.metadata.amount ?? 0;
        return this.metadata.isGained
            ? netAmount >= targetAmount
            : netAmount <= targetAmount;
    }

}