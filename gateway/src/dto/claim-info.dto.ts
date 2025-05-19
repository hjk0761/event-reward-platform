import { IsNotEmpty } from 'class-validator';

export class ClaimRewardInfo {

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    eventId: number;
}
