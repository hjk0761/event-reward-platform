import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenService } from './token.service';
import { TokenProvider } from './token.provider';

@Module({
    imports: [],
    providers: [TokenService, TokenProvider, JwtService],
    exports: [TokenService],
})
export class AuthModule { }
