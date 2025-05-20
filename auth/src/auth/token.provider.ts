import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDocument } from '../user/schemas/user.schema'
import { JwtTokenPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class TokenProvider {

    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async createToken(user: UserDocument, expiration: number, secret: string): Promise<string> {
        const payload = this.createPayloadFromUser(user);
        return this.jwtService.signAsync(
            payload,
            {
                secret: secret,
                expiresIn: expiration,
            }
        );
    }

    async validateToken(token: string, secret: string): Promise<JwtTokenPayload> {
        try {
            const decoded = await this.jwtService.verifyAsync<JwtTokenPayload>(token, { secret: secret });
            return decoded
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('토큰이 만료되었습니다.');
            } else if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('유효하지 않은 토큰입니다.');
            } else {
                throw new UnauthorizedException('토큰 검증 중 오류가 발생했습니다.');
            }
        }
    }

    async getPayload(token: string, secret: string): Promise<JwtTokenPayload> {
        return this.validateToken(token, secret);
    }

    private createPayloadFromUser(user: UserDocument): any {
        return {
            sub: user._id,
            loginId: user.loginId,
            role: user.role
        };
    }
}