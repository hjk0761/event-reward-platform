import { AttendanceUserActionLog } from "../classes/attendance-user-action-log.class";
import { FriendUserActionLog } from "../classes/friend-user-action-log.class";
import { ItemUserActionLog } from "../classes/item-user-action-log.class"
import { LevelUpUserActionLog } from "../classes/level-up-user-action-log.class"
import { QuestUserActionLog } from "../classes/quest-user-action-log.class"

export type GeneralUserActionLogs = AttendanceUserActionLog
    | FriendUserActionLog
    | ItemUserActionLog
    | LevelUpUserActionLog
    | QuestUserActionLog;