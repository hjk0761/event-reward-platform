import { IsNotEmpty } from 'class-validator';

export class ChangeActivationInfo {

    @IsNotEmpty()
    eventId: string;

    @IsNotEmpty()
    activated: boolean;
}
