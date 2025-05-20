import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDocument } from './schemas/user.schema';
import { TokenService } from '../auth/token.service';
import { Role } from './constants/role.enum';
import { TokenInfo } from './dto/token-info.dto';
import { ConfigService } from '@nestjs/config';
import { LoginInfoDocument } from 'src/auth/schemas/login-info.schema';

@Injectable()
export class UserService {

    private readonly user: string = "user";

    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel('LoginInfo') private loginInfoModel: Model<LoginInfoDocument>,
        private readonly tokenService: TokenService,
        private configService: ConfigService,
    ) { }

    async register(loginId: string, plainPassword: string, name: string, role?: Role) {
        const assignedRole = role ?? Role.USER;
        const exists = await this.userModel.findOne({ loginId: loginId });
        if (exists) throw new ConflictException('이미 존재하는 아이디입니다.');

        const rounds = Number(this.configService.get('JWT_SALT_ROUNDS') ?? 10);
        const hashedPassword = await bcrypt.hash(plainPassword, rounds);

        const created = new this.userModel({ name, loginId: loginId, password: hashedPassword, role: assignedRole });
        return created.save();
    }

    async login(loginId: string, plainPassword: string): Promise<TokenInfo> {
        const user = await this.userModel.findOne({ loginId: loginId });
        if (!user) throw new UnauthorizedException('존재하지 않는 아이디입니다.');

        const isMatch = await bcrypt.compare(plainPassword, user.password);
        if (!isMatch) throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

        const tokenInfo = await this.getTokenInfoFromUser(user);
        await this.loginInfoModel.create({ user: user._id, refreshToken: tokenInfo.refreshToken })
        return tokenInfo;
    }

    private async getTokenInfoFromUser(user: UserDocument): Promise<TokenInfo> {
        const tokenInfo = await this.tokenService.createTokens(user);
        return {
            accessToken: tokenInfo.accessToken,
            refreshToken: tokenInfo.refreshToken,
        } as TokenInfo;
    }

    async refresh(refreshToken: string): Promise<any> {
        this.tokenService.validateToken(refreshToken);
        const loginInfo = await this.loginInfoModel.findOne({ refreshToken: refreshToken }).populate('user');
        const tokenInfo = await this.getTokenInfoFromUser(loginInfo.user as UserDocument);
        await this.loginInfoModel.findOneAndUpdate({ user: loginInfo.user }, { refreshToken: refreshToken })
        return tokenInfo;
    }
}
