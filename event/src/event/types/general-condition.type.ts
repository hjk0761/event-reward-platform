import { AttendanceCheckCondition } from "../classes/attendance-check-condition.class"
import { FriendAddCountCondition } from "../classes/friend-add-count-condition.class"
import { ItemCheckCondition } from "../classes/item-check-condition.class"
import { LevelDestinationCondition } from "../classes/level-destination-condition.class"
import { LevelUpCountCondition } from "../classes/level-up-count-condition.class"
import { QuestCheckCondition } from "../classes/quest-check-condition.class"

export type GeneralCondition = AttendanceCheckCondition
    | FriendAddCountCondition
    | ItemCheckCondition
    | LevelDestinationCondition
    | LevelUpCountCondition
    | QuestCheckCondition