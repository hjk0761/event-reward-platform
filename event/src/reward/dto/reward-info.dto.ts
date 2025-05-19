import { IsNotEmpty } from 'class-validator';

export class RewardInfo {

    @IsNotEmpty()
    eventId: string;

    @IsNotEmpty()
    metadata: { itemId: number, amount: number }[];
}
