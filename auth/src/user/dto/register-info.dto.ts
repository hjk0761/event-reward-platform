import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../constants/role.enum';

export class RegisterInfo {

    @IsNotEmpty()
    loginId: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsEnum(Role, {message: "Role은 ADMIN, AUDITOR, OPERATOR, USER만 가능합니다."})
    role?: Role;
}
