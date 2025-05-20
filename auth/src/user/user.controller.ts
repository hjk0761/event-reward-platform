import { Controller, Post, Body, Res } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { RegisterInfo } from './dto/register-info.dto';
import { LoginInfo } from './dto/login-info.dto';
import { Response } from 'express';
import { RefreshTokenInfo } from './dto/refresh-token-info.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService) { }

    @Post('/register')
    async create(@Body() registerInfo: RegisterInfo): Promise<User> {
        return this.userService.register(registerInfo.loginId, registerInfo.password, registerInfo.name, registerInfo.role);
    }

    @Post('/login')
    async login(@Body() loginInfo: LoginInfo, @Res({ passthrough: true }) res: Response): Promise<any> {
        const tokenInfo = await this.userService.login(loginInfo.loginId, loginInfo.password);
        res.setHeader('Authorization', `Bearer ${tokenInfo.accessToken}`);
        return { refreshToken: tokenInfo.refreshToken };
    }

    @Post('/refresh')
    async refresh(@Body() refreshTokenInfo: RefreshTokenInfo, @Res({ passthrough: true }) res: Response): Promise<any> {
        const tokenInfo = await this.userService.refresh(refreshTokenInfo.refreshToken);
        res.setHeader('Authorization', `Bearer ${tokenInfo.accessToken}`);
        return { refreshToken: tokenInfo.refreshToken };
    }
}
