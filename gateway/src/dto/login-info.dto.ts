import { IsNotEmpty } from 'class-validator';

export class LoginInfo {

    @IsNotEmpty()
    loginId: string;

    @IsNotEmpty()
    password: string;
}
