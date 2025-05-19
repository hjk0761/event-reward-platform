import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './services/user.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { EventService } from './services/event.service';
import { UserController } from './controllers/user.controller';
import { EventController } from './controllers/event.controller';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(process.cwd(), 'example.env'),
      ],
    }),
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController, UserController, EventController],
  providers: [AppService, UserService, EventService, JwtStrategy],
})
export class AppModule { }
