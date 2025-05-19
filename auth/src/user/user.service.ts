import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { TokenService } from '../auth/token.service';
import { Role } from './constants/role.enum';
import { TokenInfo } from './dto/token-info.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {

    private readonly user: string = "user";

    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel('Counter') private counterModel: Model<any>,
        private readonly tokenService: TokenService,
        private configService: ConfigService,
    ) { }

    private async getNextId(sequenceName: string): Promise<number> {
        const updated = await this.counterModel.findOneAndUpdate(
            { id: sequenceName },
            { $inc: { seq: 1 } },
            { new: true, upsert: true },
        );
        return updated.seq;
    }

    async register(loginId: string, plainPassword: string, name: string);
    async register(loginId: string, plainPassword: string, name: string, role: Role);
    async register(loginId: string, plainPassword: string, name: string, role?: Role) {
        const assignedRole = role ?? Role.USER;
        const exists = await this.userModel.findOne({ loginId: loginId });
        if (exists) throw new ConflictException('이미 존재하는 아이디입니다.');

        const id = await this.getNextId(this.user);
        const rounds = Number(this.configService.get('JWT_SALT_ROUNDS') ?? 10);
        const hashedPassword = await bcrypt.hash(plainPassword, rounds);

        const created = new this.userModel({ id, name, loginId: loginId, password: hashedPassword, role: assignedRole });
        return created.save();
    }

    async login(loginId: string, plainPassword: string): Promise<any> {
        const user = await this.userModel.findOne({ loginId: loginId });
        if (!user) throw new UnauthorizedException('존재하지 않는 사용자');

        const isMatch = await bcrypt.compare(plainPassword, user.password);
        if (!isMatch) throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

        return this.getTokenInfoFromUser(user);
    }

    private async getTokenInfoFromUser(user: User): Promise<TokenInfo> {
        const tokenInfo = await this.tokenService.createTokens(user);
        return {
            accessToken: tokenInfo.accessToken,
            refreshToken: tokenInfo.refreshToken,
        } as TokenInfo;
    }
}
