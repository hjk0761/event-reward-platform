import { IsNotEmpty, IsEnum } from 'class-validator';
import { UserActionType } from '../constants/user-action.enum';

export class UserActionInfo {

    @IsEnum(UserActionType, { message: "UserActionType은 LEVEL, FRIEND, ATTENDANCE, ITEM, QUEST만 가능합니다." })
    type: UserActionType;

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    metadata: Record<string, any>;
}
