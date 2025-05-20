import { IsNotEmpty } from 'class-validator';

export class RefreshTokenInfo {

    @IsNotEmpty()
    refreshToken: string;
}
