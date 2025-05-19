import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserActionModule } from './user-action/user-action.module';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/event-reward-db'),
    UserActionModule,
    EventModule,
    RewardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
