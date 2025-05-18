import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
import { UserService } from './services/user.service';
import { RegisterInfo } from './dto/register-info.dto';
import { LoginInfo } from './dto/login-info.dto';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  register(@Body() registerInfo: RegisterInfo) {
    return this.userService.register(registerInfo.loginId, registerInfo.password, registerInfo.name, registerInfo.role);
  }

  @Post('/login')
  login(@Body() loginInfo: LoginInfo) {
    return this.userService.login(loginInfo.loginId, loginInfo.password);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('/admin')
  updateRole() {
    console.log('controller called: /admin');
    return
  }
}
