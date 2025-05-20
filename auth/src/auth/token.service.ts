import { Injectable, UnauthorizedException } from '@nestjs/common';

import { TokenProvider } from './token.provider';
import { UserDocument } from '../user/schemas/user.schema';
import { TokenInfo } from './interfaces/token-info.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {

    private readonly accessTokenExpiration = Number(this.configService.get<number>('ACCESS_EXPIRATION'));
    private readonly refreshTokenExpiration = Number(this.configService.get<number>('REFRESH_EXPIRATION'));
    private readonly secret = this.configService.get<string>('JWT_SECRET');

    constructor(
        private readonly tokenProvider: TokenProvider,
        private configService: ConfigService,
    ) { }

    async createTokens(user: UserDocument): Promise<TokenInfo> {
        const accessToken = await this.createAccessToken(user);
        const refreshToken = await this.createRefreshToken(user);
        return { accessToken, refreshToken } as TokenInfo;
    }

    private async createAccessToken(user: UserDocument): Promise<string> {
        return this.tokenProvider.createToken(user, this.accessTokenExpiration, this.secret);
    }

    private async createRefreshToken(user: UserDocument): Promise<string> {
        return this.tokenProvider.createToken(user, this.refreshTokenExpiration, this.secret);
    }

    async validateToken(token: string): Promise<any> {
        return this.tokenProvider.validateToken(token, this.secret);
    }

    async extractLoginIdFromToken(token: string): Promise<string> {
        const jwtPayload = await this.tokenProvider.getPayload(token, this.secret)
        if (!jwtPayload) throw new UnauthorizedException('존재하지 않는 사용자');
        return jwtPayload.loginId;
    }
}