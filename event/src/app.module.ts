import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserActionModule } from './user-action/user-action.module';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(process.cwd(), 'example.env'),
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    UserActionModule,
    EventModule,
    RewardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
