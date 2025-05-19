import { IsNotEmpty } from 'class-validator';

export class ClaimRewardInfo {

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    eventId: string;
}
