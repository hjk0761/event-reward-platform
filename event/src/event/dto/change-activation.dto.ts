import { IsNotEmpty } from 'class-validator';

export class ChangeActivationInfo {

    @IsNotEmpty()
    eventId: number;

    @IsNotEmpty()
    activated: boolean;
}
