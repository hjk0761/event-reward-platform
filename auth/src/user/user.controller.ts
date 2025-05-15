import { Controller, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { RegisterInfo } from './dto/register-info.dto';
import { LoginInfo } from './dto/login-info.dto';
import { TokenInfo } from './dto/token-info.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService) { }

    @Post('/register')
    create(@Body() registerInfo: RegisterInfo): Promise<User> {
        return this.userService.register(registerInfo.loginId, registerInfo.password, registerInfo.name, registerInfo.role);
    }

    @Post('/login')
    login(@Body() loginInfo: LoginInfo): Promise<TokenInfo> {
        return this.userService.login(loginInfo.loginId, loginInfo.password);
    }
}
