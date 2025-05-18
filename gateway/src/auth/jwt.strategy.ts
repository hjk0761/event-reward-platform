import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //secretOrKey: process.env.JWT_SECRET || 'defaultSecret', //TODO: secret env로 수정
      secretOrKey: 'asdf'
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, loginId: payload.loginId, role: payload.role };
  }
}
