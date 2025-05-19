import { IsNotEmpty, IsEnum } from 'class-validator';
import { UserActionType } from '../constants/user-action.enum';

export class EventInfo {

    @IsEnum(UserActionType, { message: "UserActionType은 LEVEL, FRIEND, ATTENDANCE, ITEM, QUEST만 가능합니다." })
    type: UserActionType;

    @IsNotEmpty()
    metadata: Record<string, any>;

    @IsNotEmpty()
    eventId: number;

    @IsNotEmpty()
    startAt: string;

    @IsNotEmpty()
    endAt: string;

    @IsNotEmpty()
    activated: boolean;
}
