import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { EventService } from 'src/services/event.service';
import { UserActionInfo } from 'src/dto/user-action.dto';
import { User } from 'src/auth/user.decorator';
import { EventInfo } from 'src/dto/event-info.dto';
import { ChangeActivationInfo } from 'src/dto/change-activation.dto';
import { RewardInfo } from 'src/dto/reward-info.dto';
import { ClaimRewardInfo } from 'src/dto/claim-info.dto';

@Controller()
export class EventController {

  constructor(
    private readonly eventService: EventService,
  ) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  @Post('/user-action/do')
  doUserAction(@Body() userActionInfo: UserActionInfo) {
    return this.eventService.doUserAction(userActionInfo.type, userActionInfo.userId, userActionInfo.metadata);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Get('/user-action/findMyAction')
  findMyAction(@User('sub') userId: number) {
    return this.eventService.findUserActionByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR', 'AUDITOR')
  @Get('/user-action/find/:id')
  findUserActionByUserId(@Param('id') userId: number) {
    return this.eventService.findUserActionByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  @Post('/event/create')
  createEvent(@Body() eventInfo: EventInfo) {
    return this.eventService.createEvent(eventInfo.type, eventInfo.metadata, eventInfo.eventId, eventInfo.startAt, eventInfo.endAt, eventInfo.activated);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  @Get('/event/find/:id')
  findEventByEventId(@Param('id') eventId: number) {
    return this.eventService.findEventById(eventId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  @Get('/event/findAll')
  findAllEvent() {
    return this.eventService.findAllEvent();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  @Put('/event/changeActivation')
  changeEventActivation(@Body() changeActivationInfo: ChangeActivationInfo) {
    return this.eventService.changeEventActivation(changeActivationInfo.eventId, changeActivationInfo.activated);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  @Post('/reward/create')
  createReward(@Body() rewardInfo: RewardInfo) {
    return this.eventService.createReward(rewardInfo.eventId, rewardInfo.metadata);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  @Get('/reward/find/:id')
  findRewardByEventId(@Param('id') eventId: number) {
    return this.eventService.findRewardByEventId(eventId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  @Get('/reward/findAll')
  findAllReward() {
    return this.eventService.findReward();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Post('/claim/reward')
  claimReward(@User('sub') userId: number, @Body() eventId: number) {
    return this.eventService.claimReward(userId, eventId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post('/claim/reward/admin')
  claimRewardForAdmin(@Body() claimRewardInfo: ClaimRewardInfo) {
    return this.eventService.claimReward(claimRewardInfo.userId, claimRewardInfo.eventId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR', 'AUDITOR')
  @Get('/claim/find/:id')
  fidnClaimByUserId(@Param('id') userId: number) {
    return this.eventService.findClaimByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR', 'AUDITOR')
  @Get('/claim/findAll')
  fidnAllClaims() {
    return this.eventService.findAllClaims();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Get('/claim/find')
  fidnClaim(@User('sub') userId: number) {
    return this.eventService.findClaimByUserId(userId);
  }
}
