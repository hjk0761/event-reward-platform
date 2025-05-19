import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserActionController } from './user-action.controller';
import { UserActionService } from './user-action.service';
import { UserActionSchema } from './schemas/user-action-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserAction', schema: UserActionSchema },
    ]),
  ],
  controllers: [UserActionController],
  providers: [UserActionService],
  exports: [UserActionService],
})
export class UserActionModule { }
