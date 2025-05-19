import { IsNotEmpty } from 'class-validator';

export class RewardInfo {

    @IsNotEmpty()
    eventId: number;

    @IsNotEmpty()
    metadata: { itemId: number, amount: number }[];
}
