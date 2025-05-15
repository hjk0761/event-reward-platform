import { IsNotEmpty } from 'class-validator';

export class TokenInfo {

    @IsNotEmpty()
    accessToken: string;

    @IsNotEmpty()
    refreshToken: string;
}
