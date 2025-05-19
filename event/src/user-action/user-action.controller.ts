import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { UserActionService } from './user-action.service';
import { UserActionModel } from './schemas/user-action-log.schema';
import { UserActionInfo } from './dto/user-action.dto';

@Controller('user-action')
export class UserActionController {

    constructor(
        private readonly userActionService: UserActionService) { }

    @Post('/do')
    create(@Body() userActionInfo: UserActionInfo): Promise<UserActionModel> {
        return this.userActionService.do(userActionInfo.type, userActionInfo.userId, userActionInfo.metadata);
    }

    @Get('/find/:id')
    login(@Param('id') id: string): Promise<UserActionModel[]> {
        return this.userActionService.findAllByUserId(id);
    }
}
