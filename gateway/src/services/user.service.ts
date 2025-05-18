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
            this.httpService.post('http://auth:3001/users/register', body),
        );
        return response.data;
    }

    async login(loginId: string, password: string) {
        const body = {
            loginId: loginId,
            password: password
        };
        const response = await firstValueFrom(
            this.httpService.post('http://auth:3001/users/login', body),
        );
        return response.data;
    }

    async updateRole(userId: number, newRole: Role) {
        return
    }
}
