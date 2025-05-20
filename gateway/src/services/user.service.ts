import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { Role } from '../constants/role.enum';

@Injectable()
export class UserService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    async register(loginId: string, password: string, name: string, role: Role) {
        const body = {
            loginId: loginId,
            password: password,
            name: name,
            role: role
        };
        const response = await firstValueFrom(
            this.httpService.post(process.env.AUTH_URI + '/users/register', body),
        );
        return response.data;
    }

    async login(loginId: string, password: string) {
        const body = {
            loginId: loginId,
            password: password
        };
        const response = await firstValueFrom(
            this.httpService.post(process.env.AUTH_URI + '/users/login', body),
        );
        const accessToken = response.headers.authorization;
        return { accessToken: accessToken, refreshToken: response.data.refreshToken };
    }

    async refresh(refreshToken: string) {
        const body = {
            refreshToken: refreshToken
        }
        const response = await firstValueFrom(
            this.httpService.post(process.env.AUTH_URI + '/users/refresh', body),
        );
        const accessToken = response.headers.authorization;
        return { accessToken: accessToken, refreshToken: response.data.refreshToken };
    }

    async updateRole(userId: number, newRole: Role) {
        return
    }
}
