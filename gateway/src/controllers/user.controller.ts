import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '../services/user.service';
import { RegisterInfo } from '../dto/register-info.dto';
import { LoginInfo } from '../dto/login-info.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Response } from 'express';
import { RefreshTokenInfo } from 'src/dto/refresh-token-info.dto';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('/register')
  register(@Body() registerInfo: RegisterInfo) {
    return this.userService.register(registerInfo.loginId, registerInfo.password, registerInfo.name, registerInfo.role);
  }

  @Post('/login')
  async login(@Body() loginInfo: LoginInfo, @Res({ passthrough: true }) res: Response) {
    const tokenInfo = await this.userService.login(loginInfo.loginId, loginInfo.password);
    res.setHeader('Authorization', `${tokenInfo.accessToken}`);
    return { refreshToken: tokenInfo.refreshToken };
  }

  @Post('/refresh')
  async refresh(@Body() refreshTokenInfo: RefreshTokenInfo, @Res({ passthrough: true }) res: Response) {
    const tokenInfo = await this.userService.refresh(refreshTokenInfo.refreshToken);
    res.setHeader('Authorization', `${tokenInfo.accessToken}`);
    return { refreshToken: tokenInfo.refreshToken };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('/admin')
  updateRole() {
    console.log('controller called: /admin');
    return
  }
}
