import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../constants/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ unique: true })
    id: number;

    @Prop()
    name: string;

    @Prop({ unique: true })
    loginId: string;

    @Prop()
    password: string;

    @Prop({ enum: Role, default: Role.USER })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);